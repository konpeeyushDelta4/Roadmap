import { IconSvgProps } from "types/ui";
import React from "react";

export default function ShareIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 18 18">
      <path
        fill={iconColor}
        d="M16.28 8.47l-6-6A.75.75 0 009 3v2.659a8.261 8.261 0 00-7.5 8.216V15a.75.75 0 001.338.465 8.593 8.593 0 015.915-3.037c.038-.004.131-.012.247-.02V15a.75.75 0 001.28.53l6-6a.75.75 0 000-1.06zm-5.78 4.72v-1.565a.75.75 0 00-.75-.75c-.191 0-.972.037-1.171.064a10.503 10.503 0 00-5.54 2.21A6.76 6.76 0 019.75 7.126a.75.75 0 00.75-.75V4.811L14.69 9l-4.19 4.19z"
      ></path>
    </svg>
  );
}
