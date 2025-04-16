import { IconSvgProps } from "types/ui";
import React from "react";

export default function WandIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} d="M18.5 2l.405 1.095L20 3.5l-1.095.405L18.5 5l-.405-1.095L17 3.5l1.095-.405L18.5 2zm-7.595 3.095L10.5 4l-.405 1.095L9 5.5l1.095.405L10.5 7l.405-1.095L12 5.5l-1.095-.405z"></path>
      <path
        fill={iconColor}
        fillRule="evenodd"
        d="M17.091 6.909a3.103 3.103 0 00-4.388 0l-10.41 10.41a1 1 0 000 1.414l2.974 2.974a1 1 0 001.414 0l10.41-10.41a3.103 3.103 0 000-4.388zm-2.974 1.414l-.78.78 1.56 1.56.78-.78a1.103 1.103 0 10-1.56-1.56z"
        clipRule="evenodd"
      ></path>
      <path fill={iconColor} d="M20.905 9.095L20.5 8l-.405 1.095L19 9.5l1.095.405L20.5 11l.405-1.095L22 9.5l-1.095-.405z"></path>
    </svg>
  );
}
