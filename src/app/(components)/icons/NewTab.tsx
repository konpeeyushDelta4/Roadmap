import { IconSvgProps } from "types/ui";
import React from "react";

export default function NewTabIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <g clipPath="url(#clip0_61_648)">
        <path
          fill={iconColor}
          d="M14.69 2.25H10.5a.75.75 0 010-1.5h6a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V3.31L9.53 9.53a.75.75 0 01-1.06-1.06l6.22-6.22zm-1.19 9a.75.75 0 011.5 0v3a3 3 0 01-3 3H3.75a3 3 0 01-3-3V6a3 3 0 013-3h3a.75.75 0 010 1.5h-3A1.5 1.5 0 002.25 6v8.25a1.5 1.5 0 001.5 1.5H12a1.5 1.5 0 001.5-1.5v-3z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_61_648">
          <path fill={iconColor} d="M0 0H18V18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
