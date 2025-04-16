"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithSSOApi } from "../../../../../network/api/product";
import { ApiResType } from "../../../../../types/enum";
import Cookies from "js-cookie";
import { useAuth } from "../../../../../context/AuthContext";
import { toast } from "react-toastify";

export default function Success() {
  const { onSSOloginSuccess } = useAuth();
  const searchParams = useSearchParams();
  const t = searchParams.get("token");
  const returnToUrl = searchParams.get("return_to");
  const router = useRouter();
  const hostname = new URL(returnToUrl || "").hostname;

  useEffect(() => {
    async function validateSSO() {
      if (!t) return;
      try {
        const res = await loginWithSSOApi({
          return_to: returnToUrl || "",
          jwt_token: t,
        });

        if (res?.type === ApiResType.SUCCESS) {
          onSSOloginSuccess(res?.data?.token);
          Cookies.set("epic_token", res?.data?.token, {
            domain: hostname,
            expires: 365,
          });

          router.push(returnToUrl || "/");
        }

        if (res?.type === ApiResType.ERROR) {
          toast.error("Token is invalid");
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
    validateSSO();
  }, [t, returnToUrl, router, hostname, onSSOloginSuccess]);

  return <></>;
}
