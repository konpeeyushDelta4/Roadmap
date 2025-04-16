import { IconSvgProps } from "types/ui";
import React from "react";

export default function SearchIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size === "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";


  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path fill={iconColor} fillOpacity="0.24" d="M10.599 19.306c4.75 0 8.599-3.874 8.599-8.653S15.348 2 10.599 2C5.849 2 2 5.874 2 10.653s3.85 8.653 8.599 8.653z"></path>
      <path
        fill={iconColor}
        fillOpacity="0.24"
        d="M20.675 21.955a1.321 1.321 0 01-.89-.384l-2.036-2.38a1.088 1.088 0 01-.08-1.522.975.975 0 011.387 0l2.561 2.05A1.342 1.342 0 0120.728 22l-.053-.045z"
        opacity="0.4"
      ></path>
    </svg>
  );
}
