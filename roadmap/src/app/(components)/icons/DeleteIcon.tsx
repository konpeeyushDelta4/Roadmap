import { IconSvgProps } from "types/ui";
import React from "react";

const DeleteIcon = (props: IconSvgProps) => {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 18 18">
      <path
        fill={iconColor}
        d="M14.732 7.116c0 .051-.4 5.107-.627 7.235-.143 1.305-.985 2.097-2.248 2.12-.97.021-1.92.029-2.854.029-.992 0-1.962-.008-2.904-.03-1.22-.028-2.062-.836-2.198-2.12-.235-2.135-.628-7.183-.635-7.234a.596.596 0 01.143-.419.533.533 0 01.393-.175h10.402c.15 0 .285.066.393.175.1.119.15.265.135.419z"
        opacity="0.4"
      ></path>
      <path
        fill={iconColor}
        d="M15.75 4.483a.541.541 0 00-.535-.55h-2.187a.96.96 0 01-.93-.763l-.123-.547A1.49 1.49 0 0010.55 1.5H7.452c-.671 0-1.256.463-1.435 1.16l-.114.511a.962.962 0 01-.93.762H2.786a.541.541 0 00-.536.55v.285c0 .3.243.55.536.55h12.43a.547.547 0 00.534-.55v-.285z"
      ></path>
    </svg>
  );
};

export default DeleteIcon;
