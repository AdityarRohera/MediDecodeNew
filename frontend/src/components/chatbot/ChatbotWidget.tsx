"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { getChat, sendChatMessage } from "@/services/operations/chatbot/chatbot";

type Message = {
  messageId?: string;
  role: "USER" | "ASSISTANT";
  message: string;
  createdAt?: string;
};

type ChatbotWidgetProps = {
  reportId: string;
};

const suggestions = [
  "Summarise this report in one line",
  "Which results should I worry about?",
  "What should I ask my doctor?",
];

export default function ChatbotWidget({ reportId }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load the conversation the first time the panel is opened.
  useEffect(() => {
    if (!open || chatId) return;

    const loadChat = async () => {
      try {
        setChatLoading(true);

        const response = await getChat(reportId);

        setChatId(response.data.chatId);

        const apiMessages = response.data.messages || [];

        setMessages(
          apiMessages.map((msg: any) => ({
            messageId: msg.MESSAGE_ID,
            role: msg.ROLE,
            message: msg.MESSAGE,
            createdAt: msg.CREATED_AT,
          }))
        );
      } catch (error) {
        console.error("Error loading chat:", error);
      } finally {
        setChatLoading(false);
      }
    };

    loadChat();
  }, [open, reportId, chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text || !chatId || typing) return;

    setMessages((prev) => [...prev, { role: "USER", message: text }]);
    setInput("");
    setTyping(true);

    try {
      const response = await sendChatMessage(chatId, text);

      const assistantMessage = response.data.assistantMessage;

      setMessages((prev) => [
        ...prev,
        {
          messageId: assistantMessage.MESSAGE_ID,
          role: assistantMessage.ROLE,
          message: assistantMessage.MESSAGE,
          createdAt: assistantMessage.CREATED_AT,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ASSISTANT",
          message:
            "Sorry, I couldn't process your question. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="group fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2.5 rounded-full bg-linear-to-br from-brand-500 to-blue-600 px-4 text-white shadow-lg shadow-brand-900/30 transition hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}

        {!open && (
          <span className="hidden text-sm font-semibold sm:inline">
            Ask about this report
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[540px] w-[380px] max-w-[calc(100vw-3rem)] animate-scale-in flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
          <div className="flex items-center gap-3 bg-linear-to-br from-brand-500 to-blue-600 px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </span>

            <div>
              <h2 className="text-sm font-semibold text-white">
                MediDecode Assistant
              </h2>

              <p className="text-xs text-brand-50">
                Answers based on this report
              </p>
            </div>
          </div>

          <div className="scrollbar-slim flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {chatLoading ? (
              <div className="space-y-3">
                <div className="skeleton h-14 w-3/4" />
                <div className="skeleton ml-auto h-10 w-1/2" />
                <div className="skeleton h-16 w-4/5" />
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Sparkles size={15} className="text-brand-600" />
                      Ask me anything
                    </p>

                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      I can explain any value in this report, in plain language.
                    </p>

                    <div className="mt-3 flex flex-col gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => send(suggestion)}
                          disabled={!chatId}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 disabled:opacity-50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={message.messageId || index}
                    className={`flex animate-fade-up ${
                      message.role === "USER"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        message.role === "USER"
                          ? "rounded-br-md bg-brand-600 text-white"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start">
                    <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          style={{ animationDelay: `${dot * 150}ms` }}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input.trim())}
              disabled={!chatId || chatLoading}
              placeholder={
                chatLoading ? "Loading conversation..." : "Type your question..."
              }
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 disabled:opacity-60"
            />

            <button
              onClick={() => send(input.trim())}
              disabled={!input.trim() || !chatId || typing}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
