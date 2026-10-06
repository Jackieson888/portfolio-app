/**
 * Server-only. Summarizes Jackson's public GitHub repos for the portfolio chat: name, description,
 * language, last push, and a trimmed README excerpt.
 *
 * - Cached for a day (Next's fetch cache plus an in-memory copy per server instance), so chat
 *   questions never wait on GitHub and a daily refresh costs ~11 API calls.
 * - Anonymous requests get 60/hour per IP. Set GITHUB_TOKEN (a fine-grained token with no extra
 *   permissions is enough for public data) to get 5,000/hour on shared hosting IPs.
 * - Never throws: if GitHub is slow or down, the chat simply answers without this section.
 */

const USER = "Jackieson888";
const MAX_REPOS = 10;
const MAX_AGE_YEARS = 3;
const README_CHARS = 1200;
const REVALIDATE_SECONDS = 60 * 60 * 24;
const TIMEOUT_MS = 4000;

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

let memo: { text: string; at: number } | null = null;

function headers(accept: string) {
  const h: Record<string, string> = {
    Accept: accept,
    "User-Agent": "jackson-schacher-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function get(url: string, accept: string) {
  const res = await fetch(url, {
    headers: headers(accept),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return res.ok ? res : null;
}

/**
 * Unedited framework/starter READMEs describe the template, not Jackson's work, and would lead the
 * chat to credit him with features he didn't build. Those get no excerpt.
 */
const TEMPLATE_README =
  /run the development server|starter template|this template (equips|provides)|getting started with create react app|this template should help get you started/i;

/** Reduces a README to readable prose: no code blocks, images, badges, HTML, or bootstrap boilerplate. */
function tidyReadme(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .split("\n")
    .filter((line) => !/bootstrapped with|create-next-app|^\s*\|?\s*-{3,}/i.test(line))
    .map((line) => line.replace(/^#+\s*/, "").replace(/[*_`>|]/g, "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, README_CHARS)
    .trim();
}

async function readme(repo: string) {
  try {
    const res = await get(`https://api.github.com/repos/${USER}/${repo}/readme`, "application/vnd.github.raw+json");
    if (!res) return "";
    // tidyReadme already drops "bootstrapped with" lines, so a README that opens with that line but
    // then describes the real project keeps its excerpt.
    const excerpt = tidyReadme(await res.text());
    return TEMPLATE_README.test(excerpt) ? "" : excerpt;
  } catch {
    return "";
  }
}

async function build() {
  const res = await get(
    `https://api.github.com/users/${USER}/repos?type=owner&sort=pushed&per_page=50`,
    "application/vnd.github+json",
  );
  if (!res) return "";

  const cutoff = Date.now() - MAX_AGE_YEARS * 365 * 24 * 60 * 60 * 1000;
  const repos = ((await res.json()) as Repo[])
    .filter((r) => !r.fork && Date.parse(r.pushed_at) >= cutoff)
    .slice(0, MAX_REPOS);

  const readmes = await Promise.all(repos.map((r) => readme(r.name)));

  return repos
    .map((r, i) =>
      [
        `### ${r.name}`,
        `URL: ${r.html_url}${r.homepage ? ` · Live: ${r.homepage}` : ""}`,
        `Primary language: ${r.language ?? "unknown"} · Last updated: ${r.pushed_at.slice(0, 10)}${r.archived ? " · archived" : ""}`,
        r.description ? `Description: ${r.description}` : "",
        r.topics?.length ? `Topics: ${r.topics.join(", ")}` : "",
        readmes[i] ? `README excerpt: ${readmes[i]}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
}

/** Returns the GitHub section for the system prompt, or "" when unavailable. */
export async function getGithubContext(): Promise<string> {
  if (memo && Date.now() - memo.at < REVALIDATE_SECONDS * 1000) return memo.text;
  try {
    const text = await build();
    // Only cache successes for the full day; retry a failed fetch after 10 minutes.
    memo = { text, at: text ? Date.now() : Date.now() - (REVALIDATE_SECONDS - 600) * 1000 };
    return text;
  } catch {
    return memo?.text ?? "";
  }
}
