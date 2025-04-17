"use client";
import { useAuth } from "../../../context/AuthContext";
import { getProductSubmissionTopicApi } from "../../../network/api/product/settings";
import React, { createContext, useEffect, useState } from "react";
import { ApiResType } from "../../../types/enum";
import { SubmissionBoardT, topicT } from "../../../types/product";

type DomainContextT = {
  loginOpen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topics: topicT[];
  boards: SubmissionBoardT[];
  activeBoards: SubmissionBoardT[];
};

const DomainContext = createContext({
  loginOpen: false,
  setLoginOpen: () => {},
  topics: [] as topicT[],
  boards: [] as SubmissionBoardT[],
  activeBoards: [] as SubmissionBoardT[],
} as DomainContextT);

export default function DomainCtxProvider({
  children,
  boards,
}: {
  children: React.ReactNode;
  boards: SubmissionBoardT[];
}) {
  const { token } = useAuth();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [topics, setTopics] = useState([] as topicT[]);
  const [activeBoards, setActiveBoards] = useState([] as SubmissionBoardT[]);

  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    ? process.env.NEXT_PUBLIC_DOMAIN
    : typeof window !== "undefined"
    ? window.location.host
    : "";

  useEffect(() => {
    if (!token || !host) return;


    async function getTopicsLsit() {
      try {
        const res = await getProductSubmissionTopicApi({
          token,
          domain: host || "",
        });

        if (res.type === ApiResType.SUCCESS) {
          setTopics(res.data);
        }
      } catch (error) {
        console.log(error, "ERR");
      }
    }
    getTopicsLsit();
  }, [token, host]);

  useEffect(() => {
    if (!boards.length) return;

    setActiveBoards(
      boards?.filter((board) => board?.show_in_dashboard === "1")
    );
  }, [boards]);

  return (
    <DomainContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
        topics,
        boards,
        activeBoards,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}

export const useDomainCtx = () => React.useContext(DomainContext);
