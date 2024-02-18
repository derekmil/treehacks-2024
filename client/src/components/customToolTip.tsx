import React from "react";

interface CustomTooltipProps {
  message: string;
  isVisible: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  message,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "8px",
        padding: "4px 8px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "4px",
        fontSize: "14px",
        zIndex: 1000, // Ensure it appears above other content
      }}
    >
      {message}
    </div>
  );
};

export default CustomTooltip;
