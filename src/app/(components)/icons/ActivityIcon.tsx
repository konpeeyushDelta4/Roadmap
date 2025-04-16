import { IconSvgProps } from "types/ui";
import React from "react";

export default function ActivityIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg className={sx} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        fill={iconColor}
        fillRule="evenodd"
        d="M15.243 4.738A4.024 4.024 0 0020 8.689v7.973C20 20.015 18.021 22 14.662 22H7.346C3.98 22 2 20.016 2 16.662V9.355C2 6.002 3.979 4 7.346 4h7.967c-.047.243-.07.49-.07.738zM13.15 14.897l2.858-3.688v-.018a.754.754 0 00-.14-1.045.728.728 0 00-1.039.15l-2.409 3.1-2.743-2.16a.74.74 0 00-1.047.14l-2.954 3.81a.72.72 0 00-.159.457.738.738 0 001.363.43l2.471-3.196 2.744 2.151a.74.74 0 001.055-.131z"
        clipRule="evenodd"
      ></path>
      <path fill={iconColor} d="M19.5 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" opacity="0.4"></path>
    </svg>
  );
}
