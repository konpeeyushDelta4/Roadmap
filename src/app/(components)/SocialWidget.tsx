"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SOCIAL_LINKS } from "../../utils/constants";
import DiscordLogo from "./logos/Discord";
import TwitterLogo from "./logos/Twitter";
import YoutubeLogo from "./logos/Youtube";
import { tv } from "tailwind-variants";
import { Button, Tooltip } from "@nextui-org/react";
import { FiArrowLeft } from "react-icons/fi";

export default function SocialWidget() {
  const [closed, setClosed] = useState(false);

  return (
    <div
      className={root({
        type: "floating",
        state: closed ? "hidden" : "active",
      })}
    >
      <Link
        href={SOCIAL_LINKS.discord}
        target="_blank"
        className={`text-[#5865F2] transition-all`}
      >
        <DiscordLogo />
      </Link>
      <Link
        href={SOCIAL_LINKS.twitter}
        target="_blank"
        className={`text-[#00AAEC] transition-all`}
      >
        <TwitterLogo />
      </Link>
      <Link
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        className={`text-[#fb5151] transition-all`}
      >
        <YoutubeLogo />
      </Link>
      <Button
        isIconOnly
        variant="light"
        radius="full"
        size="sm"
        onClick={() => setClosed(true)}
      >
        <FiArrowLeft size={16} />
      </Button>
    </div>
  );
}

const root = tv({
  base: "socials gap-3  flex items-center transition-all",
  variants: {
    type: {
      floating:
        "fixed left-0 top-[50%] translate-y-[-50%] z-[99] flex-col rounded-tr-xl rounded-br-xl p-[10px] px-[8px] bg-default-50 border border-default-100 shadow-large translate-x-[-6px] hover:translate-x-0 transition-all hover:[&>a]:scale-110 ",
    },
    state: {
      active: "",
      hidden: "translate-x-[-100%] hover:translate-x-[-100%] ",
    },
  },
});
