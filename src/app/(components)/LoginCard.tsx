"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import EmailLinkAuth from "./EmailLinkAuth";
import GoogleIcon from "./icons/GoogleIcon";
import { useAuth } from "../../context/AuthContext";

export default function LoginCard() {
  const { loading, onLogin } = useAuth();

  return (
    <>
      <h1 className="text-xl tracking-wide mb-7">Access your account</h1>
      <div className="space-y-4">
        <EmailLinkAuth />
        <div className="text-foreground/40">OR</div>
        <div className="flex flex-col gap-2">
          <Button
            isLoading={loading}
            onPress={() => onLogin("google")}
            className="flex items-center py-6 gap-3"
            radius="full"
            variant="flat"
          >
            <GoogleIcon />
            Login with google
          </Button>
        </div>
      </div>
    </>
  );
}
