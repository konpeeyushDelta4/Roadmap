import { IconSvgProps } from "types/ui";
import React from "react";

export default function GoogleIcon(props: IconSvgProps) {
  const { size = "md", color, sx } = props;
  const iconSize = size == "sm" ? 18 : 24;
  const iconColor = color ? color : "currentColor";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={sx} width={iconSize} height={iconSize} fill="none" viewBox="0 0 25 24">
      <path fill="#4285F4" d="M22.5 12.175c0-.875-.07-1.513-.22-2.175H12.5v3.948h5.74c-.115.981-.74 2.459-2.129 3.451l-.02.133 3.093 2.446.214.022c1.968-1.856 3.102-4.586 3.102-7.825z"></path>
      <path fill="#34A853" d="M12.689 22c2.777 0 5.108-.887 6.811-2.416l-3.246-2.437c-.868.587-2.034.997-3.565.997-2.72 0-5.029-1.74-5.852-4.144l-.12.01-3.175 2.382-.042.112C5.191 19.762 8.666 22 12.689 22z"></path>
      <path fill="#FBBC05" d="M6.5 14.218a8.027 8.027 0 01-.31-2.191c0-.763.114-1.502.3-2.191l-.005-.147L3.585 7l-.095.054a12.873 12.873 0 00-.99 4.973c0 1.785.36 3.471.99 4.973l3.01-2.782z"></path>
      <path fill="#EB4335" d="M12.65 5.856c1.922 0 3.22.809 3.96 1.485l2.89-2.748C17.725 2.986 15.415 2 12.65 2 8.643 2 5.183 4.238 3.5 7.496L6.812 10a6.177 6.177 0 015.837-4.144z"></path>
    </svg>
  );
}
