// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Bot, MessageCircle, Send, X } from "lucide-react";

// type Message = {
//   role: "user" | "assistant";
//   text: string;
// };

// export default function ChatbotWidget() {

//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       text: "Hi! I'm your MediDecode assistant. Ask me anything about your reports or test results.",
//     },
//   ]);


//   console.log("Getting all messages -> ************************8" , messages)

//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   const sendMessage = () => {

//     const text = input.trim();

//     if (!text) return;

//     setMessages((prev) => [...prev, { role: "user", text }]);
//     setInput("");
//     setTyping(true);

//     // TODO: replace this with a real API call once the chatbot backend is ready
//     setTimeout(() => {

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: "Thanks for your message! The assistant isn't connected yet, but this is where your answer will appear.",
//         },
//       ]);

//       setTyping(false);

//     }, 900);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         aria-label="Open chat assistant"
//         className="
//         fixed
//         bottom-6
//         right-6
//         z-50
//         flex
//         h-14
//         w-14
//         items-center
//         justify-center
//         rounded-full
//         bg-linear-to-br
//         from-cyan-500
//         to-blue-600
//         text-white
//         shadow-lg
//         shadow-blue-900/20
//         transition
//         hover:scale-105
//       "
//       >
//         {open ? <X size={24} /> : <MessageCircle size={24} />}
//       </button>

//       {/* Chat Panel */}
//       {open && (
//         <div
//           className="
//           fixed
//           bottom-24
//           right-6
//           z-50
//           flex
//           h-[520px]
//           w-[360px]
//           max-w-[calc(100vw-2rem)]
//           flex-col
//           overflow-hidden
//           rounded-3xl
//           border
//           border-slate-200
//           bg-white
//           shadow-2xl
//           shadow-slate-900/10
//         "
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 bg-linear-to-br from-cyan-500 to-blue-600 px-5 py-4">

//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
//               <Bot className="h-5 w-5 text-white" />
//             </div>

//             <div>
//               <h2 className="font-semibold text-white">
//                 MediDecode Assistant
//               </h2>

//               <p className="text-xs text-cyan-50">
//                 Ask about your reports
//               </p>
//             </div>

//           </div>

//           {/* Messages */}
//           <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">

//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
//                     message.role === "user"
//                       ? "bg-cyan-600 text-white"
//                       : "border border-slate-200 bg-white text-slate-700"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}

//             {typing && (
//               <div className="flex justify-start">
//                 <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400">
//                   Typing...
//                 </div>
//               </div>
//             )}

//             <div ref={bottomRef} />
//           </div>

//           {/* Input */}
//           <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">

//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type your question..."
//               className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
//             />

//             <button
//               onClick={sendMessage}
//               disabled={!input.trim()}
//               aria-label="Send message"
//               className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <Send size={18} />
//             </button>

//           </div>

//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

import { getChat , sendChatMessage } from "@/services/operations/chatbot/chatbot";


type Message = {
    messageId?: string;
    role: "USER" | "ASSISTANT";
    message: string;
    createdAt?: string;
};


type ChatbotWidgetProps = {
    reportId: string;
};


export default function ChatbotWidget({
    reportId,
}: ChatbotWidgetProps) {

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState("");

    const [typing, setTyping] = useState(false);

    const [chatLoading, setChatLoading] = useState(false);

    const [chatId, setChatId] = useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const bottomRef = useRef<HTMLDivElement>(null);


    // -----------------------------------------
    // LOAD CHAT
    // -----------------------------------------

    useEffect(() => {

        if (!open) return;

        // Don't call API again if chat already loaded
        if (chatId) return;


        const loadChat = async () => {

            try {

                setChatLoading(true);

                const response = await getChat(reportId);

                console.log(
                    "Chat response:",
                    response
                );


                setChatId(response.data.chatId);


                const apiMessages =
                    response.data.messages || [];


                setMessages(
                    apiMessages.map((msg: any) => ({
                        messageId: msg.MESSAGE_ID,
                        role: msg.ROLE,
                        message: msg.MESSAGE,
                        createdAt: msg.CREATED_AT,
                    }))
                );


            } catch (error) {

                console.error(
                    "Error loading chat:",
                    error
                );

            } finally {

                setChatLoading(false);
            }
        };


        loadChat();

    }, [open, reportId, chatId]);


    // -----------------------------------------
    // AUTO SCROLL
    // -----------------------------------------

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages, typing]);


    // -----------------------------------------
    // SEND MESSAGE
    // -----------------------------------------

    const sendMessage = async () => {

        const text = input.trim();

        if (!text) return;

        if (!chatId) return;

        if (typing) return;


        // Immediately show user's message
        const userMessage: Message = {
            role: "USER",
            message: text,
        };


        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);


        setInput("");

        setTyping(true);


        try {

            const response = await sendChatMessage(
                chatId,
                text
            );


            console.log(
                "Send message response:",
                response
            );


            const assistantMessage =
                response.data.assistantMessage;


            setMessages((prev) => [
                ...prev,
                {
                    messageId:
                        assistantMessage.MESSAGE_ID,

                    role:
                        assistantMessage.ROLE,

                    message:
                        assistantMessage.MESSAGE,

                    createdAt:
                        assistantMessage.CREATED_AT,
                },
            ]);


        } catch (error) {

            console.error(
                "Error sending message:",
                error
            );


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
            {/* Floating Button */}

            <button
                onClick={() => setOpen(!open)}
                aria-label="Open chat assistant"
                className="
                    fixed
                    bottom-6
                    right-6
                    z-50
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    from-cyan-500
                    to-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-900/20
                    transition
                    hover:scale-105
                "
            >

                {open
                    ? <X size={24} />
                    : <MessageCircle size={24} />
                }

            </button>


            {/* Chat Panel */}

            {open && (

                <div
                    className="
                        fixed
                        bottom-24
                        right-6
                        z-50
                        flex
                        h-130
                        w-90
                        max-w-[calc(100vw-2rem)]
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        shadow-2xl
                        shadow-slate-900/10
                    "
                >

                    {/* Header */}

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            bg-linear-to-br
                            from-cyan-500
                            to-blue-600
                            px-5
                            py-4
                        "
                    >

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-2xl
                                bg-white/20
                            "
                        >

                            <Bot
                                className="h-5 w-5 text-white"
                            />

                        </div>


                        <div>

                            <h2
                                className="
                                    font-semibold
                                    text-white
                                "
                            >
                                MediDecode Assistant
                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-cyan-50
                                "
                            >
                                Ask about your reports
                            </p>

                        </div>

                    </div>


                    {/* Messages */}

                    <div
                        className="
                            flex-1
                            space-y-3
                            overflow-y-auto
                            bg-slate-50
                            p-4
                        "
                    >

                        {chatLoading ? (

                            <div
                                className="
                                    flex
                                    justify-center
                                    py-5
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-slate-400
                                    "
                                >
                                    Loading conversation...
                                </p>

                            </div>

                        ) : (

                            <>

                                {/* Initial message */}

                                {messages.length === 0 && (

                                    <div className="flex justify-start">

                                        <div
                                            className="
                                                max-w-[80%]
                                                rounded-2xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-4
                                                py-2.5
                                                text-sm
                                                leading-6
                                                text-slate-700
                                            "
                                        >
                                            Hi! I'm your MediDecode
                                            assistant. Ask me anything
                                            about your reports or test
                                            results.
                                        </div>

                                    </div>

                                )}


                                {messages.map(
                                    (message, index) => (

                                        <div
                                            key={
                                                message.messageId ||
                                                index
                                            }
                                            className={`
                                                flex
                                                ${
                                                    message.role ===
                                                    "USER"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }
                                            `}
                                        >

                                            <div
                                                className={`
                                                    max-w-[80%]
                                                    rounded-2xl
                                                    px-4
                                                    py-2.5
                                                    text-sm
                                                    leading-6
                                                    ${
                                                        message.role ===
                                                        "USER"
                                                            ? "bg-cyan-600 text-white"
                                                            : "border border-slate-200 bg-white text-slate-700"
                                                    }
                                                `}
                                            >

                                                {message.message}

                                            </div>

                                        </div>

                                    )
                                )}


                                {typing && (

                                    <div
                                        className="
                                            flex
                                            justify-start
                                        "
                                    >

                                        <div
                                            className="
                                                rounded-2xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-4
                                                py-2.5
                                                text-sm
                                                text-slate-400
                                            "
                                        >
                                            Typing...
                                        </div>

                                    </div>

                                )}

                            </>

                        )}


                        <div ref={bottomRef} />

                    </div>


                    {/* Input */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            border-t
                            border-slate-200
                            bg-white
                            p-3
                        "
                    >

                        <input
                            type="text"
                            value={input}
                            disabled={
                                !chatId ||
                                chatLoading ||
                                typing
                            }
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {
                                    e.preventDefault();
                                    sendMessage();
                                }

                            }}
                            placeholder="Type your question..."
                            className="
                                h-11
                                flex-1
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                text-sm
                                outline-none
                                transition
                                focus:border-cyan-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-cyan-100
                                disabled:opacity-50
                            "
                        />


                        <button
                            onClick={sendMessage}
                            disabled={
                                !input.trim() ||
                                !chatId ||
                                chatLoading ||
                                typing
                            }
                            aria-label="Send message"
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-cyan-600
                                text-white
                                transition
                                hover:bg-cyan-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <Send size={18} />

                        </button>

                    </div>

                </div>

            )}

        </>
    );
}