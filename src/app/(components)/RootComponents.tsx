import React from "react";
import ShortcutHelpModal from "./ShortcutHelpModal";
import LoginModal from "./LoginModal";
import SocialWidget from "./SocialWidget";

export default function RootComponents() {
  return (
    <>
      <LoginModal />
      <ShortcutHelpModal />
      {/* <SocialWidget /> */}
    </>
  );
}
