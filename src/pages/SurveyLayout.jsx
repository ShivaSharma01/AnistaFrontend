import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const SurveyLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default SurveyLayout;
