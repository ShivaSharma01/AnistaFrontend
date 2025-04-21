import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const QuickTopic = ({ icon: Icon, label, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="mb-2"
    >
      <Button
        variant="outline"
        onClick={onClick}
        className="w-full justify-start text-gray-700 text-left font-medium border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 hover:text-blue-800 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out py-5 px-4"
      >
        <Icon className="mr-3 h-5 w-5 text-blue-500" />
        <span>{label}</span>
      </Button>
    </motion.div>
  );
};
