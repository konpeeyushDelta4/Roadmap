import { IconSvgProps } from "types/ui";
import React from "react";

export default function ArrowDownIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} d="M16.9 9.2c-.4-.4-1-.4-1.4 0L12 12.7 8.5 9.2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3l4.2-4.2c.4-.4.4-1 0-1.4z"></path>
    </svg>
  );
}
