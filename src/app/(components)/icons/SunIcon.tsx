import { IconSvgProps } from "types/ui";
import React from "react";

export default function SunIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path
        fill={iconColor}
        d="M5.6 7c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-.7-.7c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l.7.7zm12.1.3c.3 0 .5-.1.7-.3l.7-.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-.7.7c-.4.4-.4 1 0 1.4.1.2.4.3.7.3zM12 5c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .6.4 1 1 1zM5.6 17l-.7.7c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l.7-.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0zM5 12c0-.6-.4-1-1-1H3c-.6 0-1 .4-1 1s.4 1 1 1h1c.6 0 1-.4 1-1zm13.4 5c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l.7.7c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-.7-.7zM12 19c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1s1-.4 1-1v-1c0-.6-.4-1-1-1zm9-8h-1c-.6 0-1 .4-1 1s.4 1 1 1h1c.6 0 1-.4 1-1s-.4-1-1-1zm-9-4.5C9 6.5 6.5 9 6.5 12S9 17.5 12 17.5s5.5-2.5 5.5-5.5S15 6.5 12 6.5z"
      ></path>
    </svg>
  );
}
