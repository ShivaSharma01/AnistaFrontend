import { motion } from "framer-motion";
import { Sun } from "lucide-react";

export const ChatHeader = ({ title, subtitle, logoSrc }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 py-4 border-b border-blue-100 mb-6"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
        {logoSrc ? (
          <img src={logoSrc} alt={title} className="w-8 h-8" />
        ) : (
          <Sun className="w-7 h-7 text-white" />
        )}
      </div>
      <div>
        <h2 className="text-left font-bold text-lg text-blue-900">{title}</h2>
        <p className="text-sm text-blue-600">{subtitle}</p>
      </div>
    </motion.div>
  );
};
