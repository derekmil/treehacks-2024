import React, { useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import CustomTooltip from "./customToolTip";

interface BoxProps {
  name: string;
  latex: string;
}

const Box: React.FC<BoxProps> = ({ name, latex }) => {
  const [copied, setCopied] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setIsTooltipVisible(true);
      setTimeout(() => setIsTooltipVisible(false), 2000); // Hide "Copied" tooltip after 2 seconds
    } catch (err) {
      console.error("Failed to copy text to clipboard", err);
    }
  };

  return (
    <div onClick={() => handleCopyToClipboard(latex)}>
      <div
        style={{ position: "relative" }}
        onClick={() => handleCopyToClipboard(latex)}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>{name}</span>
        </div>
        <CustomTooltip message="Copied!" isVisible={isTooltipVisible} />
      </div>
    </div>
  );
};

export default Box;
