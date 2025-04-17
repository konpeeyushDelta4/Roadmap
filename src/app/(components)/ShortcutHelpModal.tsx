"use client";

import {
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsFillKeyboardFill } from "react-icons/bs";
import { isMac } from "../../utils/helpers";

const ITEMS = [
  {
    id: 1,
    key: isMac ? "⌘ + D" : "Ctrl + D",
    desc: "Bookmark site",
  },
  {
    id: 2,
    key: isMac ? "⌘ + ↑" : "Ctrl + ↑",
    desc: "Scroll to top",
  },
  {
    id: 3,
    key: isMac ? "⌘ + ↓" : "Ctrl + ↓",
    desc: "Scroll to bottom",
  },
  {
    id: 4,
    key: isMac ? "⌘ + /" : "Ctrl + /",
    desc: "Focus search input",
  },
  {
    id: 5,
    key: "Esc",
    desc: "Remove focus from search",
  },
  {
    id: 6,
    key: isMac ? "⌘ + Shift + '+'" : "Ctrl + Shift + '+'",
    desc: "Submit a product",
  },
  {
    id: 7,
    key: isMac ? "⌘ + Shift + ?" : "Ctrl + Shift + ?",
    desc: "Toggle help menu",
  },
];

export default function ShortcutHelpModal() {
  const router = useRouter();
  const { token, setLoginOpen } = useAuth();
  const { shortcutHelpOpen, setShortcutHelpOpen } = useApp();
  
  useEffect(() => {
    const handleGlobalKeyDown = (event: any) => {
      if (event.key === "d" && (event.ctrlKey || event.metaKey)) {
        // Cmd+D (Mac) or Ctrl+D (Windows) - Bookmark site
        // event.preventDefault();
        console.log("Bookmarking this site for future");
      } else if ((event.ctrlKey || event.metaKey) && event.key === "ArrowUp") {
        // Ctrl+Up - Scroll to top
        event.preventDefault();
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "ArrowDown"
      ) {
        // Ctrl+Down - Scroll to bottom
        event.preventDefault();
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "/" &&
        event.target.tagName !== "INPUT"
      ) {
        // Ctrl + / - Focus search input
        event.preventDefault();
        const input = document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement;
        if (input) {
          input.focus();
        }
      } else if (event.key === "Escape") {
        // Esc - Remove focus from search
        const input = document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement;
        if (input) {
          input.blur();
        }
      } else if (
        event.key === "P" &&
        event.shiftKey &&
        (event.ctrlKey || event.metaKey)
      ) {
        // + - Redirect to some page

        if (token) {
          router.push("/product/add");
        } else {
          setLoginOpen(true);
        }
      } else if (
        event.key === "?" &&
        event.shiftKey &&
        (event.ctrlKey || event.metaKey)
      ) {
        //ctrl + shift ? - Toggle help menu

        setShortcutHelpOpen((prevShowHelp) => !prevShowHelp);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [router, token, setLoginOpen, setShortcutHelpOpen]);

  return (
    <Modal
      size={"md"}
      isOpen={shortcutHelpOpen}
      onClose={() => {
        setShortcutHelpOpen(false);
      }}
      backdrop="opaque"
    >
      <ModalContent>
        {/* {(onClose) => ( */}
        <ModalHeader className="flex gap-2 items-center">
          <BsFillKeyboardFill size={24} /> Help
        </ModalHeader>
        <ModalBody className="pb-8">
          <div className="flex flex-col gap-2">
            {ITEMS.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex flex-row gap-2 ">
                    <div className="min-w-[60px]">
                      <Kbd className="text-default-500">{item.key}</Kbd>
                    </div>
                    {/* <div className="w-20">{item.key}</div> */}
                    <div className="text-default-600">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
