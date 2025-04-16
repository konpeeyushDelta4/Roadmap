import { IconSvgProps } from "types/ui";
import React from "react";

export default function StarIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 15 16">
      <path
        fill={iconColor}
        d="M11.672 15.17a.753.753 0 01-.35-.086L7.5 13.074l-3.823 2.01a.75.75 0 01-1.088-.791l.73-4.257L.226 7.022a.75.75 0 01.416-1.28l4.274-.62 1.911-3.873a.781.781 0 011.346 0l1.91 3.872 4.275.621a.75.75 0 01.416 1.28l-3.093 3.014.73 4.257a.749.749 0 01-.74.877z"
      ></path>
    </svg>
  );
}
