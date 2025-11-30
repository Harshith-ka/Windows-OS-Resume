import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  text: string;
  isUser: boolean;
}

const faqs = [
  {
    keywords: ["skills", "what can you do", "technologies", "tech stack"],
    response:
      "I'm proficient in React, TypeScript, Node.js, MongoDB, and modern web technologies. I specialize in building full-stack applications with clean, maintainable code. Check out my Skills section for the complete list!",
  },
  {
    keywords: ["experience", "work", "job", "worked"],
    response:
      "I have experience working on various projects ranging from e-commerce platforms to SaaS applications. My background includes both frontend and backend development. Visit the Experience section to see my detailed work history!",
  },
  {
    keywords: ["available", "hire", "contact", "reach"],
    response:
      "Yes, I'm currently open to new opportunities! You can reach me via email or LinkedIn. Check the Contact section for all my contact details.",
  },
  {
    keywords: ["projects", "portfolio", "built", "made"],
    response:
      "I've built several projects including web applications, mobile apps, and automation tools. Each project showcases different aspects of my skills. Explore the Projects section to see my work in detail!",
  },
  {
    keywords: ["education", "degree", "studied", "university"],
    response:
      "I have a strong educational background in Computer Science. Check out the Education section for details about my academic journey and certifications.",
  },
  {
    keywords: ["location", "where", "based", "remote"],
    response:
      "I'm currently based in [Your Location] and open to both remote and on-site opportunities. I've worked successfully with distributed teams across different time zones.",
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hello! 👋 I'm an AI assistant that can answer questions about my creator. Feel free to ask me about their skills, experience, availability, or projects!",
  },
  {
    keywords: ["help", "what can i ask"],
    response:
      "You can ask me about:\n• Skills and technologies\n• Work experience\n• Projects and portfolio\n• Education background\n• Availability and contact info\n\nJust type your question naturally!",
  },
];

export const FAQAssistantApp = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your personal AI assistant. Ask me anything about skills, experience, projects, or availability!",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    for (const faq of faqs) {
      if (faq.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        return faq.response;
      }
    }

    return "I'm not sure about that specific question. Try asking about skills, experience, projects, education, or availability. You can also type 'help' to see what I can answer!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = findResponse(input);
      const botMessage: Message = { text: response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">AI Assistant</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Always ready to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                message.isUser
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-sm shadow-md"
              }`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
