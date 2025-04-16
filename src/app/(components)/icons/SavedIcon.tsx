import { IconSvgProps } from "types/ui";
import React from "react";

export default function SavedIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg className={sx} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} fillOpacity="0.72" d="M16 2H8C6.3 2 5 3.3 5 5v16c0 .2 0 .3.1.5.3.5.9.6 1.4.4l5.5-3.2 5.5 3.2c.2.1.3.1.5.1.6 0 1-.4 1-1V5c0-1.7-1.3-3-3-3z"></path>
    </svg>
  );
}
