import { IconSvgProps } from "types/ui";
import React from "react";

export default function SortIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 18 18">
      <path
        fill={iconColor}
        fillOpacity="0.42"
        d="M3.905 6.22L5.25 4.875v9.75a.75.75 0 101.5 0v-9.75L8.095 6.22a.75.75 0 001.06-1.06L7.06 3.063a1.5 1.5 0 00-2.12 0L2.844 5.16a.75.75 0 001.06 1.06zm10.94 6.31L13.5 13.875v-9.75a.75.75 0 10-1.5 0v9.75l-1.345-1.345a.75.75 0 00-1.06 1.06l2.094 2.095a1.5 1.5 0 002.121 0l2.095-2.094a.75.75 0 00-1.06-1.06z"
      ></path>
    </svg>
  );
}
