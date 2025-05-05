import React from "react";

const TimeDisplay = ({ time }) => {
  return (
    <span className="hidden md:block text-sm text-gray-400 font-medium">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
};

export default TimeDisplay;
