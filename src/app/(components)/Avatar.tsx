import Image from "next/image";
import React from "react";
import { getMediumDarkColorHex } from "../../utils/helpers";

export default function Avatar({ classNames, name, image }: { classNames?: string; image?: string; name?: string }) {
  return (
    <div style={{ background: image ? "transparent" : getMediumDarkColorHex(name) }} className={`h-[32px] text-base aspect-square text-white rounded-full overflow-hidden flex relative justify-center items-center ${classNames}`}>
      {image ? <Image src={image} fill className="object-cover" alt="Profile pic" /> : <span className="uppercase font-medium">{(name && name[0]) || "👀"}</span>}
    </div>
  );
}
