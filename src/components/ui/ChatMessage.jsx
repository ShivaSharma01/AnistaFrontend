import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const ChatMessage = ({ message, isAI = true, avatar, isLoading = false }) => { // Added isLoading prop

  // Define animation variants for pulsing
  const pulseAnimation = {
    scale: [1, 1.02, 1], // Scale up slightly and back down
    opacity: [1, 0.8, 1], // Fade slightly
    transition: {
      duration: 1,
      repeat: Infinity, // Repeat indefinitely
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
      className={cn(
        "flex w-full gap-3 mb-4", // Removed relative and hover handlers
        isAI ? "justify-start" : "justify-end"
      )}
    >
      {isAI && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="AI" className="w-8 h-8 rounded-full" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        // Apply pulse animation if isLoading and isAI are true
        animate={isLoading && isAI ? pulseAnimation : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-left",
          isAI
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 rounded-tl-none border border-blue-100"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none"
        )}
      >
        {message}
      </motion.div>

      {/* Removed reaction hover box */}
      {/* Removed reaction indicator */}

      {!isAI && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="User" className="w-8 h-8 rounded-full" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
