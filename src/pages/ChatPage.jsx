// import React, { useState, useRef, useEffect } from "react";
// import {
//   LightbulbIcon,
//   FileTextIcon,
//   BoltIcon,
//   LeafIcon,
//   SendIcon,
//   HelpCircle, // Import an icon for the question bubble if desired
// } from "lucide-react";
// import axios from "axios";

// const ChatPage = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "👋 Hi there! I'm your Anista solar AI assistant. How can I help you with your solar energy questions today?",
//       followUpQuestion: null, // Add followUpQuestion field
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isLoading]); // Add isLoading dependency

//   // Function to detect and split follow-up questions
//   const processAIResponse = (responseText) => {
//     const lastQuestionMarkIndex = responseText.lastIndexOf('?');
//     // Avoid splitting if "?" is the very last character or not found
//     if (lastQuestionMarkIndex === -1 || lastQuestionMarkIndex === responseText.length - 1) {
//       return { content: responseText, followUpQuestion: null };
//     }

//     const potentialQuestion = responseText.substring(lastQuestionMarkIndex + 1).trim();
//     const mainContent = responseText.substring(0, lastQuestionMarkIndex + 1).trim();

//     // Heuristic checks: short length, no other sentence terminators
//     const isLikelyFollowUp = potentialQuestion.length > 0 &&
//                              potentialQuestion.length < 150 &&
//                              !potentialQuestion.includes('. ') &&
//                              !potentialQuestion.includes('! ');

//     if (isLikelyFollowUp) {
//       return { content: mainContent, followUpQuestion: potentialQuestion };
//     } else {
//       // If heuristic fails, return the original text as main content
//       return { content: responseText, followUpQuestion: null };
//     }
//   };

//   const handleSendMessage = async (userInput) => {
//     if (!userInput.trim()) return;

//     const userMessage = { role: "user", content: userInput };
//     // Ensure user messages also have the followUpQuestion field
//     setMessages((prev) => [...prev, { ...userMessage, followUpQuestion: null }]);
//     setInput("");
//     setIsLoading(true); // Start loading before API call

//     try {
//       const res = await axios.post("http://localhost:3001/chat", {
//         message: userInput,
//         userId: "1",
//         sessinId: "12",
//       });

//       // Process the response to potentially split the question
//       const processedResponse = processAIResponse(res.data.response);

//       const assistantMessage = {
//         role: "assistant",
//         content: processedResponse.content,
//         followUpQuestion: processedResponse.followUpQuestion,
//       };

//       // Add the potentially split message(s)
//       setMessages((prev) => [...prev, assistantMessage]);

//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, I encountered an error. Please try again.",
//           followUpQuestion: null, // Ensure error messages also have the field
//         },
//       ]);
//     } finally {
//       setIsLoading(false); // Stop loading after processing
//     }
//   };

//   // Modify formatResponse to add justify style
//   const formatResponse = (content) => {
//       const sections = content.split("\n\n");

//       return (
//         <div className="space-y-3">
//           {sections.map((section, idx) => {
//             if (section.trim().startsWith("**")) {
//               const [title, ...items] = section.split("\n");
//               return (
//                 // Justify list items as well
//                 <div key={idx} style={{ textAlign: 'justify' }}>
//                   <h4 className="font-semibold text-gray-800 mb-1">
//                     {title.replace(/\*\*/g, "")}
//                   </h4>
//                   <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
//                     {items.map((item, i) => (
//                       <li key={i}>{item.replace(/^- /, "")}</li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             }

//             // Add justify style to paragraphs
//             return (
//               <p key={idx} className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
//                 {section}
//               </p>
//             );
//           })}
//         </div>
//       );
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className="border-b bg-white">
//          {/* ... (Header JSX remains unchanged) ... */}
//          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center text-2xl font-bold text-teal-600">
//             <span className="text-yellow-400 mr-2">
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="6" fill="currentColor" />
//                 <path
//                   d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 5L17.66 6.41M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </span>
//             Anista
//           </div>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//             Get Started
//           </button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-1 max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4">
//            {/* ... (Sidebar JSX remains unchanged) ... */}
//            <div className="bg-white rounded-lg border shadow-sm p-4">
//             <div className="mb-4">
//               <div className="flex items-center text-lg font-semibold mb-4">
//                 <LightbulbIcon className="w-5 h-5 text-yellow-500 mr-2" />
//                 Quick Topics
//               </div>
//               <div className="space-y-3">
//                 <button
//                   className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50"
//                   onClick={() =>
//                     handleSendMessage(
//                       "What types of solar panels are available and which is best?"
//                     )
//                   }
//                 >
//                   <FileTextIcon className="w-5 h-5 text-blue-400 mr-2" />
//                   Panel Types
//                 </button>
//                 <button
//                   className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50"
//                   onClick={() =>
//                     handleSendMessage(
//                       "What are the costs and savings associated with solar panels?"
//                     )
//                   }
//                 >
//                   <BoltIcon className="w-5 h-5 text-yellow-500 mr-2" />
//                   Cost & Savings
//                 </button>
//                 <button
//                   className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50"
//                   onClick={() =>
//                     handleSendMessage(
//                       "What incentives are available for solar installation?"
//                     )
//                   }
//                 >
//                   <LeafIcon className="w-5 h-5 text-green-500 mr-2" />
//                   Incentives
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Chat Section */}
//         <div className="w-full md:w-3/4 flex flex-col">
//           <div className="bg-white rounded-3xl border shadow-xl p-6 flex-1 flex flex-col">
//             {/* Chat Header */}
//              {/* ... (Chat Header JSX remains unchanged) ... */}
//              <div className="flex items-center gap-3 pb-4 border-b mb-4">
//               <div className="bg-yellow-300 text-yellow-900 font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
//                 ☀️
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-800">Anista Solar AI</h1>
//                 <p className="text-sm text-gray-500">Your smart solar assistant</p>
//               </div>
//             </div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto space-y-1 mb-4 px-2 custom-scroll scroll-smooth"> {/* Reduced space-y */}
//               {messages.map((msg, i) => (
//                 // Use React.Fragment to render multiple bubbles for one message object
//                 <React.Fragment key={i}>
//                   <div
//                     className={`flex ${
//                       msg.role === "assistant" ? "justify-start" : "justify-end"
//                     } ${msg.followUpQuestion ? 'mb-1' : 'mb-4'}`} // Reduce margin if follow-up exists
//                   >
//                     <div className="flex items-end gap-2">
//                       {/* Assistant avatar */}
//                       {msg.role === "assistant" && (
//                         <div className="w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-sm self-start"> {/* Align avatar top */}
//                           AI
//                         </div>
//                       )}

//                       {/* Main Chat Bubble */}
//                       <div
//                         className={`p-4 max-w-[75%] text-sm whitespace-pre-wrap break-words transition-all duration-300 rounded-2xl ${
//                           msg.role === "assistant"
//                             ? "bg-gray-200 text-gray-800 rounded-bl-none" // Assistant style (justified via formatResponse)
//                             : "bg-blue-500 text-white rounded-br-none text-left" // User style (explicitly text-left)
//                         }`}
//                       >
//                         {/* Render formatted response for assistant, raw for user */}
//                         {msg.role === "assistant" ? formatResponse(msg.content) : msg.content}
//                       </div>

//                       {/* User avatar */}
//                       {msg.role === "user" && (
//                         <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm">
//                           U
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Follow-up Question Bubble (if exists) */}
//                   {msg.role === "assistant" && msg.followUpQuestion && (
//                     <div className="flex justify-start mb-4"> {/* Standard margin for the last bubble */}
//                       <div className="flex items-end gap-2">
//                          {/* Spacer to align with main bubble (adjust width if needed) */}
//                          <div className="w-8 h-8"></div>
//                          <div
//                            className="p-3 max-w-[75%] text-sm whitespace-pre-wrap break-words transition-all duration-300 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 rounded-bl-none" // Lighter background
//                            style={{ textAlign: 'justify' }} // Keep justify style here
//                          >
//                            {/* Optional: Add a small icon */}
//                            {/* <HelpCircle className="w-4 h-4 inline-block mr-1" /> */}
//                            {msg.followUpQuestion}
//                          </div>
//                       </div>
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}

//               {/* Loading Indicator */}
//               {isLoading && (
//                 <div className="flex justify-start mb-4"> {/* Added margin */}
//                   <div className="flex items-end gap-2">
//                     <div className="w-8 h-8 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-sm">
//                       AI
//                     </div>
//                     <div className="p-4 max-w-[75%] text-sm bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none">
//                       <div className="flex space-x-1">
//                         <span className="typing-dot"></span>
//                         <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
//                         <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Section */}
//              {/* ... (Input Form JSX remains unchanged) ... */}
//              <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSendMessage(input);
//               }}
//               className="flex gap-3 border-t pt-4"
//             >
//               <input
//                 type="text"
//                 className="flex-1 border border-gray-300 px-5 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//                 placeholder="Ask me anything about solar..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <SendIcon className="w-5 h-5" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ChatPage;
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { ChatHeader } from "../components/ui/ChatHeader";
import { ChatMessage } from "../components/ui/ChatMessage";
import { ChatInput } from "../components/ui/ChatInput";
import { QuickTopic } from "../components/ui/QuickTopic";
import { motion } from "framer-motion";
import { FileText, DollarSign, Lightbulb } from "lucide-react";

export const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi there! I'm your Anista solar AI assistant. How can I help you with your solar energy questions today?",
      isAI: true,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const streamingIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }

    const userMessage = { text: userInput, isAI: false };
    const placeholderAIMessage = { text: "", isAI: true };

    setMessages((prev) => [...prev, userMessage, placeholderAIMessage]);
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:3001/chat", {
        message: userInput,
        userId: "1",
        sessionId: "12",
      });

      setIsTyping(false);

      const fullResponse = res.data.response;
      const words = fullResponse.split(' ');
      let wordIndex = 0;

      streamingIntervalRef.current = setInterval(() => {
        if (wordIndex < words.length) {
          const currentText = words.slice(0, wordIndex + 1).join(' ');
          setMessages(prevMessages => {
            return prevMessages.map((msg, index) => {
              if (index === prevMessages.length - 1) {
                return { ...msg, text: currentText };
              }
              return msg;
            });
          });
          wordIndex++;
        } else {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }
      }, 75);
    } catch (error) {
      console.error("Error fetching response:", error);
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].text = "Sorry, I encountered an error. Please try again.";
        return updatedMessages;
      });
      setIsTyping(false);
    }
  };

  const handleQuickTopic = (topic) => {
    const topicMessages = {
      "panel-types": "Tell me about different types of solar panels",
      "cost-savings": "What savings can I expect from solar installation?",
      incentives: "What incentives are available for solar installation?",
    };

    if (topicMessages[topic]) {
      handleSendMessage(topicMessages[topic]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar: Quick Topics */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-80 flex-shrink-0"
      >
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-amber-600 font-semibold">
            <Lightbulb className="w-5 h-5" />
            <h3>Quick Topics</h3>
          </div>

          <QuickTopic
            icon={FileText}
            label="Panel Types"
            onClick={() => handleQuickTopic("panel-types")}
          />

          <QuickTopic
            icon={DollarSign}
            label="Cost & Savings"
            onClick={() => handleQuickTopic("cost-savings")}
          />

          <QuickTopic
            icon={Lightbulb}
            label="Incentives"
            onClick={() => handleQuickTopic("incentives")}
          />
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-lg border border-gray-200 p-8"
        >
          <ChatHeader
            title="Anista Solar AI"
            subtitle="Your smart solar assistant"
          />

          <div className="space-y-4 mb-6 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isAI={message.isAI}
                isLoading={isTyping && message.isAI && index === messages.length - 1}
              />
            ))}
          </div>

          <ChatInput
            onSend={handleSendMessage}
            placeholder="Ask me anything about solar..."
            disabled={isTyping}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;

