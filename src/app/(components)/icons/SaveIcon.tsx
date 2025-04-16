import { IconSvgProps } from "types/ui";
import React from "react";

export default function SaveIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 12 16">
      <path
        fill={iconColor}
        fillOpacity="0.24"
        d="M9 .5H3A2.25 2.25 0 00.75 2.75v12a.75.75 0 001.125.652L6 13.018l4.125 2.384a.75.75 0 00.375.098.75.75 0 00.375-.098.75.75 0 00.375-.652v-12A2.25 2.25 0 009 .5zm.75 12.953l-3.375-1.95a.75.75 0 00-.75 0l-3.375 1.95V2.75A.75.75 0 013 2h6a.75.75 0 01.75.75v10.703z"
      ></path>
    </svg>
  );
}
