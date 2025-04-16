import { IconSvgProps } from "types/ui";
import React from "react";

export default function ArrowUpIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 19 19">
      <path fill={iconColor} d="M13.25 14a.75.75 0 01-.75-.75V6.5H5.75a.75.75 0 010-1.5h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75z"></path>
      <path fill={iconColor} d="M5.75 14a.75.75 0 01-.53-1.28l7.5-7.5a.75.75 0 011.06 1.06l-7.5 7.5a.748.748 0 01-.53.22z"></path>
    </svg>
  );
}
