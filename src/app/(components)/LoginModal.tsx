"use client";
import React from "react";
import { Modal, ModalContent } from "@heroui/modal";
import LoginCard from "./LoginCard";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal() {
  const { loginOpen, setLoginOpen } = useAuth();

  return (
    <Modal
      isOpen={loginOpen}
      onClose={() => {
        setLoginOpen(false);
      }}
      backdrop="blur"
    >
      <ModalContent className="text-center h-auto p-10">
        <LoginCard />
      </ModalContent>
    </Modal>
  );
}
