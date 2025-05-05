import React from "react";
import { FaBars } from "react-icons/fa";
import { useSidebar } from "@/SidebarProvider/SidebarProvider";

const SidebarButton = () => {
  const { setOpen } = useSidebar();

  return (
    <button
      onClick={() => setOpen(true)}
      className="lg:hidden hover:text-blue-400 transition-all duration-200"
    >
      <FaBars size={24} />
    </button>
  );
};

export default SidebarButton;
