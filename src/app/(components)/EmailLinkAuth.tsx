"use client";
import { Button, Input, divider } from "@heroui/react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { firebaseApp } from "../../network/firebase";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import WandIcon from "./icons/WandIcon";
import ArrowRightIcon from "./icons/ArrowRight";
import { STORAGE_KEYS } from "../../utils/constants";
import { sendMagicLinkOnEmailApi } from "../../network/api/auth";
import { ApiResType } from "../../types/enum";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

let auth: any;

if (typeof window !== "undefined") {
  auth = getAuth(firebaseApp);
}

const EmailLinkAuth: React.FC = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    ? process.env.NEXT_PUBLIC_DOMAIN
    : typeof window !== "undefined"
    ? window.location.host
    : "";

  async function onFormSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await sendMagicLinkOnEmailApi({
        email: e.currentTarget.elements?.email?.value,
        domain: host || "",
      });
      if (res?.type === ApiResType.SUCCESS) {
        setSuccess(res?.message);
        setErr(false);
      }
      if (res?.type === ApiResType.ERROR) {
        setErr(true);
        setSuccess("");
        toast.error(res.message);
      }

      setLoading(false);
    } catch (err) {
      setErr(true);
      setSuccess("");
      console.log(err, "something went wrong!!");
      toast.error("something went wrong!!");
      setLoading(false);
    }
  }
  const t = useTranslations("Login");
  return (
    <form className={"w-full"} onSubmit={onFormSubmit}>
      <div className="text-left mb-2">
        <label className="flex gap-2 mb-2 text-sm items-center" htmlFor="email">
          <WandIcon sx="text-accent" />
          {t("Login with Magic Link")}
        </label>
        <Input
          radius="full"
          size="sm"
          placeholder={t("Enter your email")}
          id="email"
          name="email"
          type="email"
          endContent={
            <Button
              isLoading={loading}
              type="submit"
              radius="full"
              className="bg-primary -mr-4"
              startContent={
                <div className={`${loading ? "hidden" : "block"}`}>
                  <ArrowRightIcon color="#ffffff" />
                </div>
              }
              isIconOnly
            />
          }
        />
      </div>

      {err && (
        <span className="text-red-500">
          {t("Sorry, we encountered an error")}
        </span>
      )}
      {success && <span className="text-green-500">{success}</span>}
    </form>
  );
};

export default EmailLinkAuth;
