import { IconSvgProps } from "types/ui";
import React from "react";

export default function EyeIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path
        fill={iconColor}
        fillOpacity="0.62"
        fillRule="evenodd"
        d="M17.737 6.046c1.707 1.318 3.16 3.249 4.205 5.663a.728.728 0 010 .572C19.854 17.111 16.137 20 12 20h-.01c-4.127 0-7.844-2.89-9.931-7.719a.728.728 0 010-.572C4.146 6.88 7.863 4 11.99 4H12c2.068 0 4.03.718 5.737 2.046zM8.097 12c0 2.133 1.747 3.87 3.903 3.87 2.146 0 3.893-1.737 3.893-3.87A3.888 3.888 0 0012 8.121c-2.156 0-3.903 1.736-3.903 3.879z"
        clipRule="evenodd"
        opacity="0.4"
      ></path>
      <path fill={iconColor} fillOpacity="0.62" d="M14.43 11.997a2.428 2.428 0 01-2.428 2.415c-1.347 0-2.44-1.087-2.44-2.415 0-.165.02-.32.05-.474h.048a1.997 1.997 0 002-1.921c.107-.019.225-.03.342-.03a2.43 2.43 0 012.428 2.425z"></path>
    </svg>
  );
}
