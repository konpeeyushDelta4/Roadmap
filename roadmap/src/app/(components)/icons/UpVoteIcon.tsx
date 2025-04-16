import { IconSvgProps } from "types/ui";
import React from "react";

export default function UpVoteIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 18 18">
      <g clipPath="url(#clip0_261_361)">
        <path
          fill={iconColor}
          // fillOpacity="0.62"
          d="M16.646 13.217L10.46 2.53a1.688 1.688 0 00-2.922 0L1.355 13.217a1.687 1.687 0 001.46 2.532h12.372a1.689 1.689 0 001.46-2.532z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_261_361">
          <path fill={iconColor} d="M0 0H18V18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
