import { IconSvgProps } from "types/ui";
import React from "react";

export default function ArrowRightIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} d="M17.7 11.2l-5-5c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.3 3.3H7c-.6 0-1 .4-1 1s.4 1 1 1h7.6l-3.3 3.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l5-5c.4-.3.4-1 0-1.4z"></path>
    </svg>
  );
}
