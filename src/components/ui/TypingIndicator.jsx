import { motion } from "framer-motion";

export const TypingIndicator = () => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-600">
          <path d="M7.5 1.5C4.05 1.5 1.5 4.5 1.5 7.5C1.5 10.5 4.05 13.5 7.5 13.5C9 13.5 9.5 13 10 12C10 11.5 9.5 11.5 9 11.5C8.5 11.5 8.25 11.75 7.5 11.75C5.5 11.75 3.5 9.75 3.5 7.5C3.5 5.25 5.5 3.5 7.5 3.5C9.5 3.5 11.5 5.25 11.5 7.5V8.25C11.5 8.75 11 9.25 10.5 9.25C10 9.25 9.5 8.75 9.5 8.25V5C9.5 4.75 9.25 4.5 9 4.5C8.75 4.5 8.5 4.75 8.5 5V5.25C8.25 5 7.75 4.5 7 4.5C5.75 4.5 4.5 5.75 4.5 7.5C4.5 9.25 5.75 10.5 7 10.5C7.75 10.5 8.25 10.25 8.5 9.75C8.75 10.25 9.5 10.75 10.25 10.75C11.5 10.75 12.5 9.5 12.5 8.25V7.5C12.5 4.5 10.95 1.5 7.5 1.5ZM6.5 7.5C6.5 6.75 6.75 6 7.5 6C8.25 6 8.5 6.75 8.5 7.5C8.5 8.25 8.25 9 7.5 9C6.75 9 6.5 8.25 6.5 7.5Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="rounded-2xl rounded-tl-none bg-white border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex space-x-1">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="h-2 w-2 rounded-full bg-amber-500"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            className="h-2 w-2 rounded-full bg-amber-500"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            className="h-2 w-2 rounded-full bg-amber-500"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};