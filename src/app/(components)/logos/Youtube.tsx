import React from "react";

export const youtubeColor = "#CE1312";

function YoutubeLogo({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 42 42">
      <g clipPath="url(#clip0_414_1598)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M16.663 26.486V14.602l11.347 5.962-11.347 5.922zM41.58 12.542s-.41-2.914-1.67-4.198c-1.597-1.685-3.387-1.693-4.207-1.79-5.878-.429-14.694-.429-14.694-.429h-.018s-8.816 0-14.694.428c-.821.098-2.61.106-4.209 1.791C.83 9.628.42 12.542.42 12.542S0 15.966 0 19.388v3.21c0 3.423.42 6.845.42 6.845s.41 2.915 1.668 4.198c1.599 1.686 3.697 1.633 4.632 1.808 3.36.326 14.28.426 14.28.426s8.825-.013 14.703-.441c.82-.1 2.61-.107 4.207-1.793 1.26-1.283 1.67-4.198 1.67-4.198s.42-3.422.42-6.846v-3.209c0-3.422-.42-6.846-.42-6.846z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_414_1598">
          <path fill="#fff" d="M0 0H42V42H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default YoutubeLogo;
