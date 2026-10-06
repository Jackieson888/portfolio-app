"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Box, Typography } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import StopRounded from "@mui/icons-material/StopRounded";
import {
  blue,
  bodyMuted,
  border,
  borderThin,
  card,
  display,
  ink,
  mono,
  orange,
  paper,
  shadow,
  yellow,
} from "@/src/tokens";

const SUGGESTIONS = [
  "What did Jackson own at Sekady Capital?",
  "How does edh-tool pick its recommendations?",
  "What's his experience with AWS?",
  "Is he a good fit for a front-end role?",
];

const MAX_CHARS = 600;

function textOf(parts: { type: string; text?: string }[]) {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

function errorText(error: Error | undefined) {
  if (!error) return "";
  try {
    const parsed = JSON.parse(error.message) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    // Not a JSON error body; fall through to the generic message.
  }
  return "Sorry, the chat couldn't answer that. Try again, or email jschacher8@gmail.com.";
}

/**
 * Floating "Ask about my work" assistant. The launcher sits bottom-right on every screen;
 * the panel answers from the site's own content via /api/chat and says plainly that it's AI.
 */
export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (text: string) => {
    const q = text.trim().slice(0, MAX_CHARS);
    if (!q || busy) return;
    if (error) clearError();
    sendMessage({ text: q });
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <Box
        component="button"
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        aria-label={open ? "Close chat" : "Ask about my work"}
        sx={{
          position: "fixed",
          right: { xs: "14px", sm: "24px" },
          bottom: { xs: "14px", sm: "24px" },
          zIndex: 60,
          display: open ? { xs: "none", sm: "flex" } : "flex",
          alignItems: "center",
          gap: "8px",
          px: { xs: "13px", sm: "18px" },
          py: { xs: "13px", sm: "12px" },
          fontFamily: mono,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: ink,
          backgroundColor: yellow,
          border,
          borderRadius: "10px",
          boxShadow: shadow(5),
          cursor: "pointer",
          transition: "transform .2s ease, box-shadow .2s ease",
          "&:hover": { transform: "translate(2px, 2px)", boxShadow: shadow(3) },
        }}
      >
        {open ? <CloseRounded sx={{ fontSize: { xs: 22, sm: 18 } }} /> : <AutoAwesomeRounded sx={{ fontSize: { xs: 22, sm: 18 } }} />}
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          {open ? "Close" : "Ask about my work"}
        </Box>
      </Box>

      {open ? (
        <Box
          id="portfolio-chat"
          role="dialog"
          aria-label="Ask about Jackson's work"
          sx={{
            position: "fixed",
            zIndex: 61,
            right: { xs: 0, sm: "24px" },
            bottom: { xs: 0, sm: "86px" },
            left: { xs: 0, sm: "auto" },
            width: { xs: "100%", sm: 400 },
            height: { xs: "85dvh", sm: "min(600px, calc(100dvh - 120px))" },
            display: "flex",
            flexDirection: "column",
            backgroundColor: card,
            border,
            borderRadius: { xs: "14px 14px 0 0", sm: "10px" },
            boxShadow: { xs: "none", sm: shadow(8) },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
              px: "18px",
              py: "14px",
              backgroundColor: ink,
              color: paper,
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: display, fontSize: 22, fontWeight: 700, lineHeight: 1.1, m: 0 }}>
                Ask about Jackson&apos;s work
              </Typography>
              <Typography sx={{ fontSize: 12.5, lineHeight: 1.4, color: "#c9c4b4", mt: "4px" }}>
                An AI assistant that answers from his resume and case studies. It can make mistakes, so check
                the resume for anything important.
              </Typography>
            </Box>
            <Box
              component="button"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              sx={{
                flexShrink: 0,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                color: paper,
                border: `2px solid ${paper}`,
                borderRadius: "6px",
                cursor: "pointer",
                "&:hover": { backgroundColor: paper, color: ink },
              }}
            >
              <CloseRounded sx={{ fontSize: 18 }} />
            </Box>
          </Box>

          <Box
            ref={listRef}
            aria-live="polite"
            sx={{ flex: 1, overflowY: "auto", px: "16px", py: "16px", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: paper }}
          >
            {messages.length === 0 ? (
              <Box>
                <Typography sx={{ fontSize: 14.5, color: ink, mb: "12px" }}>
                  Try one of these, or ask your own:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {SUGGESTIONS.map((s, i) => (
                    <Box
                      key={s}
                      component="button"
                      type="button"
                      onClick={() => ask(s)}
                      sx={{
                        textAlign: "left",
                        fontSize: 14,
                        fontWeight: 600,
                        color: ink,
                        backgroundColor: card,
                        border: borderThin,
                        borderLeft: `6px solid ${[orange, blue, yellow][i % 3]}`,
                        borderRadius: "6px",
                        px: "12px",
                        py: "9px",
                        cursor: "pointer",
                        transition: "transform .15s ease",
                        "&:hover": { transform: "translateX(3px)" },
                      }}
                    >
                      {s}
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : null}

            {messages.map((m) => {
              const text = textOf(m.parts as { type: string; text?: string }[]);
              if (!text) return null;
              const mine = m.role === "user";
              return (
                <Box
                  key={m.id}
                  sx={{
                    alignSelf: mine ? "flex-end" : "flex-start",
                    maxWidth: "88%",
                    px: "12px",
                    py: "9px",
                    borderRadius: "8px",
                    border: borderThin,
                    backgroundColor: mine ? blue : card,
                    color: ink,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {text}
                </Box>
              );
            })}

            {status === "submitted" ? (
              <Box sx={{ alignSelf: "flex-start", fontFamily: mono, fontSize: 12, color: bodyMuted }}>Thinking…</Box>
            ) : null}

            {error ? (
              <Box
                role="alert"
                sx={{ fontSize: 13.5, color: ink, backgroundColor: "#fde3d8", border: borderThin, borderRadius: "6px", px: "12px", py: "9px" }}
              >
                {errorText(error)}
              </Box>
            ) : null}
          </Box>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: "flex", alignItems: "flex-end", gap: "8px", p: "12px", borderTop: borderThin, backgroundColor: card }}
          >
            <Box
              component="textarea"
              ref={inputRef}
              value={input}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={(e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              rows={1}
              placeholder="Ask about projects, skills, or experience…"
              aria-label="Your question"
              sx={{
                flex: 1,
                resize: "none",
                fontFamily: "inherit",
                fontSize: 15,
                lineHeight: 1.4,
                color: ink,
                backgroundColor: paper,
                border: borderThin,
                borderRadius: "8px",
                px: "12px",
                py: "10px",
                maxHeight: 120,
                outline: "none",
                "&:focus-visible": { outline: `3px solid ${blue}`, outlineOffset: "1px" },
              }}
            />
            <Box
              component="button"
              type={busy ? "button" : "submit"}
              onClick={busy ? () => stop() : undefined}
              disabled={!busy && !input.trim()}
              aria-label={busy ? "Stop answer" : "Send question"}
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ink,
                backgroundColor: orange,
                border: borderThin,
                borderRadius: "8px",
                cursor: "pointer",
                "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
                "&:hover:not(:disabled)": { backgroundColor: ink, color: paper },
              }}
            >
              {busy ? <StopRounded /> : <ArrowUpwardRounded />}
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
