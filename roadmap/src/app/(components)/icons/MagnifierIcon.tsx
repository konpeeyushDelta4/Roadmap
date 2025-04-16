import React from "react";
import { IconSvgProps } from "types/ui";

export default function MagnifireIcon(props: IconSvgProps) {
    const { size = "md", color, sx } = props;
    const iconSize = size == "sm" ? 18 : 24;
    const iconColor = color ? color : "currentColor";
    return (
        <svg
            className={sx} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                fill={iconColor}
                fillRule="evenodd"
                d="M15.707 14.293l-3.112-3.092-.006-.004A6.955 6.955 0 0014 7c0-3.859-3.141-7-7-7S0 3.141 0 7s3.141 7 7 7a6.956 6.956 0 004.196-1.41l.004.006 3.093 3.111a.997.997 0 001.414 0 .999.999 0 000-1.414zm-4.332-7.387c-.896.225-1.12-1.117-2.188-2.156C8 3.594 6.637 3.35 6.812 2.562c.129-.576 1.926-.832 3.656.781 1.73 1.615 1.532 3.407.907 3.563z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}