import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun } from "lucide-react";

export const WelcomeOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-b from-amber-50 to-blue-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, ease: "linear" },
                scale: { duration: 1, repeat: 1, repeatType: "reverse" }
              }}
              className="inline-block text-amber-500 mb-4"
            >
              <Sun size={60} />
            </motion.div>
            <motion.h1
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: 1, repeatType: "reverse" }}
              className="text-3xl font-bold text-amber-600"
            >
              Anista Solar AI
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};