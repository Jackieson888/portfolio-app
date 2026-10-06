import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { openai, type OpenAILanguageModelResponsesOptions } from "@ai-sdk/openai";
import { buildSystemPrompt } from "../../lib/portfolioContext";
import { getGithubContext } from "../../lib/githubContext";

/**
 * Portfolio chat: answers visitor questions from the site's own data (see portfolioContext), plus a
 * daily-cached summary of public GitHub repos (see githubContext).
 * Calls OpenAI directly (OPENAI_API_KEY, server-side only). Responses are not stored on OpenAI
 * (store: false), so visitors' questions don't accumulate in the account.
 *
 * Guardrails, since this is a public endpoint on someone's personal bill:
 * - text-only messages, capped in count and length, so a visitor can't paste a novel
 * - a short output cap
 * - a best-effort per-IP rate limit (in memory, so per server instance; put a shared store
 *   such as Upstash or Vercel KV in front if traffic ever warrants it)
 */

export const maxDuration = 30;

const MODEL = process.env.PORTFOLIO_CHAT_MODEL ?? "gpt-6-luna";
/** "none" skips the model's thinking step: answers start faster and cost less. */
const REASONING_EFFORT = (process.env.PORTFOLIO_CHAT_REASONING ?? "none") as NonNullable<
  OpenAILanguageModelResponsesOptions["reasoningEffort"]
>;

const MAX_MESSAGES = 12; // conversation history sent to the model
const MAX_CHARS_PER_MESSAGE = 600;
const MAX_TOTAL_CHARS = 8000; // history budget; older turns are dropped past this
const MAX_OUTPUT_TOKENS = 450;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

/**
 * Keeps only user/assistant text parts. The newest user message must fit MAX_CHARS_PER_MESSAGE;
 * older history is dropped (oldest first) to stay within MAX_TOTAL_CHARS, so long conversations
 * keep working instead of erroring.
 */
function sanitize(input: unknown): UIMessage[] | "invalid" | "too_long" {
  if (!Array.isArray(input) || input.length === 0) return "invalid";

  const cleaned: UIMessage[] = [];
  for (const raw of input.slice(-MAX_MESSAGES)) {
    if (!raw || typeof raw !== "object") return "invalid";
    const { id, role, parts } = raw as { id?: unknown; role?: unknown; parts?: unknown };
    if (role !== "user" && role !== "assistant") return "invalid";
    if (!Array.isArray(parts)) return "invalid";

    const text = parts
      .filter((p): p is { type: "text"; text: string } => p?.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join("\n")
      .trim()
      .slice(0, 2000);
    if (!text) continue;
    cleaned.push({ id: typeof id === "string" ? id : crypto.randomUUID(), role, parts: [{ type: "text", text }] });
  }

  const last = cleaned[cleaned.length - 1];
  if (!last || last.role !== "user") return "invalid";
  const lastText = (last.parts[0] as { text: string }).text;
  if (lastText.length > MAX_CHARS_PER_MESSAGE) return "too_long";

  // Walk back from the newest message, keeping as much history as fits the budget.
  const kept: UIMessage[] = [];
  let total = 0;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    const len = (cleaned[i].parts[0] as { text: string }).text.length;
    if (kept.length > 0 && total + len > MAX_TOTAL_CHARS) break;
    kept.unshift(cleaned[i]);
    total += len;
  }
  // The model expects the conversation to open with a user turn.
  while (kept.length > 1 && kept[0].role !== "user") kept.shift();
  return kept;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return fail(503, "The chat is offline right now. Email jschacher8@gmail.com instead.");
  }

  if (rateLimited(clientIp(req))) {
    return fail(429, "That's a lot of questions! Give it a few minutes, or email jschacher8@gmail.com.");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (messages === "too_long") {
    return fail(400, `Please keep questions under ${MAX_CHARS_PER_MESSAGE} characters.`);
  }
  if (messages === "invalid") return fail(400, "Invalid request.");

  const result = streamText({
    model: openai(MODEL),
    system: buildSystemPrompt(await getGithubContext()),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    providerOptions: {
      openai: { store: false, reasoningEffort: REASONING_EFFORT } satisfies OpenAILanguageModelResponsesOptions,
    },
  });

  return result.toUIMessageStreamResponse({
    onError: () => "Sorry, something went wrong on my end. Try again, or email jschacher8@gmail.com.",
  });
}
