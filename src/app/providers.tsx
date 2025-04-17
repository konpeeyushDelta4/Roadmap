"use client";
import { NextUIProvider } from "@nextui-org/react";
import AppProvider from "../context/AppContext";
import AuthContext from "../context/AuthContext";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>
          <AppProvider>
            <ProgressBar
              height="3px"
              color="#925fff"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {children}
          </AppProvider>
          <ToastContainer
            toastClassName="rounded-2xl"
            hideProgressBar
            theme="light"
          />
        </NextUIProvider>
      </ThemeProvider>
    </AuthContext>
  );
}
