import { IconSvgProps } from "types/ui";
import React from "react";

export default function MoonIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} fillOpacity="0.42" d="M12.144 21.729A10.137 10.137 0 017.947 2.36a1 1 0 011.385 1.153 8.112 8.112 0 007.892 10.118c1.16 0 2.307-.25 3.362-.733a.999.999 0 011.384 1.154 10.119 10.119 0 01-9.826 7.677z"></path>
    </svg>
  );
}
