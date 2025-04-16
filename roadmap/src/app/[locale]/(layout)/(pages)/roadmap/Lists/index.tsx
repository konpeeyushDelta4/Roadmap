"use client";
import { useDomainCtx } from "../../../context/DomainCtxProvider";
import React, { useCallback, useEffect, useState } from "react";
import { SubmissionDetailT } from "../../../../../../types/product";
import List from "./List";
import { getProductSubmissionApi } from "../../../../../../network/api/product/roadmap";
import { ApiResType } from "../../../../../../types/enum";
import { useAuth } from "../../../../../../context/AuthContext";
import { DOMAIN_TOPBAR_HEIGHT } from "../../../../../../utils/ui";

export default function Lists({ allSubmissions }: { allSubmissions: SubmissionDetailT[] }) {
  const { activeBoards } = useDomainCtx();

  const { token } = useAuth();
  const [list, setList] = useState<SubmissionDetailT[]>(allSubmissions || []);
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : typeof window !== "undefined" ? window.location.host : "";

  const loadFeatures = useCallback(async () => {
    try {
      if (!host) return;


      const res = await getProductSubmissionApi({
        limit: "50",
        page: "1",
        domain: host || "",
        token,
      });

      if (res.type === ApiResType.SUCCESS) {
        setList(res?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  }, [host, token]);

  useEffect(() => {
    loadFeatures();
  }, [loadFeatures]);

  return (
    <div style={{ height: `calc(100vh - (${DOMAIN_TOPBAR_HEIGHT}px + 80px )` }} className="horizontal_scrollbar flex gap-4 max-w-7xl 2xl:max-w-screen-2xl overflow-auto">
      {activeBoards.map((board) => {
        return <List name={board?.name} color={board?.color} key={board?.id} boardlist={list.filter((i) => i?.submission_board?.id === board?.id) || []} />;
      })}
    </div>
  );
}
