import React, { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = "top" }) => {
  // Define positioning classes based on the `position` prop
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  // Arrow positioning for top, bottom, left, and right
  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2",
    left: "left-full top-1/2 transform -translate-y-1/2",
    right: "right-full top-1/2 transform -translate-y-1/2",
  };

  // Arrow color styling (adjust for theme if necessary)
  const arrowColorClasses = "bg-blue-500";

  return (
    <div className="relative flex items-center justify-center group">
      {children}
      <span
        className={`absolute ${positionClasses[position]} hidden group-hover:flex bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
        role="tooltip"
      >
        {text}
        {/* Tooltip arrow */}
        <span
          className={`absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${arrowClasses[position]} ${arrowColorClasses}`}
        ></span>
      </span>
    </div>
  );
};

export default Tooltip;
