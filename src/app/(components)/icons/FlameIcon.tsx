import { IconSvgProps } from "types/ui";
import React from "react";

export default function FlameIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 12 14">
      <path
        fill={iconColor}
        d="M7.64 14a.696.696 0 01-.272-.055 5.891 5.891 0 01-2.875-2.542 4.2 4.2 0 00.127 1.633.607.607 0 01-.045.495.645.645 0 01-.216.229.69.69 0 01-.624.06 5.994 5.994 0 01-2.245-1.514A5.599 5.599 0 01.197 9.998a5.406 5.406 0 01-.07-2.614 5.564 5.564 0 011.171-2.366c.372-.458.82-.856 1.325-1.18l.154-.118a4.484 4.484 0 001.161-1.403A4.266 4.266 0 004.424.592a.611.611 0 01.104-.3.655.655 0 01.245-.216.695.695 0 01.645.006 5.64 5.64 0 012.383 2.45c.51 1.03.67 2.184.462 3.305.386-.314.702-.696.932-1.125a.64.64 0 01.168-.201.679.679 0 01.509-.142.69.69 0 01.256.082.823.823 0 01.153.111 5.632 5.632 0 011.505 2.484c.27.936.285 1.922.04 2.864a5.612 5.612 0 01-1.434 2.521 6.045 6.045 0 01-2.547 1.538.703.703 0 01-.205.031z"
      ></path>
    </svg>
  );
}
