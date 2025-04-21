import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export const ChatInput = ({ 
  onSend, 
  placeholder = "Ask me anything about solar...", 
  disabled = false
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mt-4"
    >
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-12 py-6 rounded-full shadow-sm border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || disabled}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
};
