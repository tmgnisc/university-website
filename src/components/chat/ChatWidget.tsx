import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import chatbotData from "@/data/chatbot.json";
import { findChatbotAnswer, type ChatbotData } from "@/lib/chatbot";

const chatbot = chatbotData as ChatbotData;

// Quick navigation shown under each bot answer so users can jump straight to the
// relevant page or start an application.
const CHAT_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: "How to apply", to: "/admissions" },
  { label: "Programs", to: "/programs" },
  { label: "Scholarships", to: "/scholarships" },
];

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  time: string;
};

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createWelcomeMessage(): Message {
  return {
    id: "welcome",
    role: "bot",
    text: chatbot.welcomeMessage,
    time: formatTime(),
  };
}

function QuickQuestions({ onSelect }: { onSelect: (question: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  if (!chatbot.quickQuestions.length) return null;

  return (
    <div className="border-t border-border/50 bg-background px-3 py-2.5">
      <div className="mb-2 flex items-center gap-1.5 px-0.5">
        <HelpCircle className="size-3.5 text-primary" />
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Quick questions
        </p>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
        )}

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll questions left"
            className="absolute left-0 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-border/60 bg-background/95 text-muted-foreground shadow-sm transition-colors hover:text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll questions right"
            className="absolute right-0 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-border/60 bg-background/95 text-muted-foreground shadow-sm transition-colors hover:text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scroll-smooth px-0.5 pb-0.5 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {chatbot.quickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onSelect(question)}
              className="shrink-0 snap-start rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-2 text-left text-xs font-medium leading-snug text-primary transition-colors hover:border-primary/30 hover:bg-primary/10 active:scale-[0.98]"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Bot className="size-3.5" />
      </div>
      <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage()]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const id = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${id}`,
        role: "user",
        text: trimmed,
        time: formatTime(),
      },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${id}`,
          role: "bot",
          text: findChatbotAnswer(
            trimmed,
            chatbot.entries,
            chatbot.fallbackMessage,
            chatbot.offTopicMessage,
            chatbot.domainKeywords,
          ),
          time: formatTime(),
        },
      ]);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div data-chat-widget>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/20",
              "right-4 w-[min(100vw-2rem,380px)] sm:right-6",
              "bottom-40 h-[min(70vh,520px)] sm:bottom-24 sm:h-[520px]",
            )}
            role="dialog"
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-navy-deep px-4 py-3.5 text-white">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/90">
                <Bot className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold leading-tight">{chatbot.botName}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {chatbot.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-muted/30">
              <div className="space-y-4 p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    {msg.role === "bot" && (
                      <div className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Bot className="size-3.5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] space-y-1",
                        msg.role === "user" ? "items-end" : "items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                          msg.role === "bot"
                            ? "rounded-tl-md bg-white text-foreground whitespace-pre-line"
                            : "rounded-tr-md bg-primary text-primary-foreground",
                        )}
                      >
                        {msg.text}
                      </div>
                      <p
                        className={cn(
                          "px-1 text-[10px] text-muted-foreground",
                          msg.role === "user" ? "text-right" : "text-left",
                        )}
                      >
                        {msg.time}
                      </p>
                      {msg.role === "bot" && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {CHAT_LINKS.map((l) => (
                            <Link
                              key={l.label}
                              to={l.to}
                              hash={l.hash}
                              onClick={() => setOpen(false)}
                              className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
                            >
                              {l.label}
                            </Link>
                          ))}
                          <Link
                            to="/admissions"
                            hash="apply"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                          >
                            Apply Now <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <QuickQuestions onSelect={sendMessage} />

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-background p-3"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-border/80 bg-muted/40 px-4"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="size-10 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-24 right-6 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform hover:scale-110 sm:bottom-6"
        >
          <MessageCircle className="size-6" />
        </button>
      )}
    </div>
  );
}
