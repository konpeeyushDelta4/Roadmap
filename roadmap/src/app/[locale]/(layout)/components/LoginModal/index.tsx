"use client";
import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { useAuth } from "../../../../../context/AuthContext";
import EmailLinkAuth from "../../../../(components)/EmailLinkAuth";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import GoogleIcon from "../../../../(components)/icons/GoogleIcon";
import { useDomainCtx } from "../../context/DomainCtxProvider";
import { useProductDetail } from "../../context/ProductProvider";
import Link from "next/link";

export default function LoginModal() {
  const { loading, onLogin } = useAuth();
  const { productDetail } = useProductDetail();
  const { loginOpen, setLoginOpen } = useDomainCtx();
  const t = useTranslations("Login");

  async function handleLogin() {
    let res = await onLogin("google");

    if (res?.login) {
      setLoginOpen(false);
    }
  }

  return (
    <Modal
      isOpen={loginOpen}
      onClose={() => {
        setLoginOpen(false);
      }}
      backdrop="blur"
    >
      <ModalContent className="text-center h-auto p-10">
        <>
          <h1 className="text-xl tracking-wide mb-7">
            {t("Access your account")}
          </h1>
          <div className="space-y-4">
            <EmailLinkAuth />
            <div className="text-foreground/40">{t("OR")}</div>
            <div className="flex flex-col gap-2">
              <Button
                isLoading={loading}
                onPress={handleLogin}
                className="flex items-center py-6 gap-3"
                radius="full"
                variant="flat"
              >
                <GoogleIcon />
                {t("Login with google")}
              </Button>
            </div>
            {Boolean(productDetail?.product_dashboard_setting?.enable_sso) && (
              <Button
                as={Link}
                href={
                  productDetail?.product_dashboard_setting?.redirect_url +
                  "?return_to=" +
                  (typeof window !== "undefined" ? window.location.href : "")
                }
                className="flex"
                color="primary"
                radius="full"
              >
                Login with{" "}
                {productDetail?.product_dashboard_setting?.button_label ||
                  "SSO"}
              </Button>
            )}
          </div>
        </>
      </ModalContent>
    </Modal>
  );
}
