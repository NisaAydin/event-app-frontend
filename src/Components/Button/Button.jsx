import React from "react";
import "./Button.css";

function Button({
  text,
  onClick,
  type = "button",
  className,
  icon,
  variant = "primary",
}) {
  return (
    <button
      type={type}
      className={`custom-button ${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
}

export default Button;
