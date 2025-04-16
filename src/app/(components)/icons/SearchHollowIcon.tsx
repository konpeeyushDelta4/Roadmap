import { IconSvgProps } from "types/ui";
import React from "react";

export default function SearchHollowIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 18 18">
      <path fill={iconColor} fillOpacity="0.62" d="M16.282 15.218l-2.782-2.76a6.75 6.75 0 10-1.042 1.042l2.76 2.76a.751.751 0 001.064 0 .75.75 0 000-1.042zM8.25 13.5A5.25 5.25 0 118.25 3a5.25 5.25 0 010 10.501z"></path>
    </svg>
  );
}
