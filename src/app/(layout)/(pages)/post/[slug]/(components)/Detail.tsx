"use client";
import React, { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Aside from "./Aside";
import { SubmissionDetailT } from "../../../../../../types/product";

export default function Detail({ detail }: { detail: SubmissionDetailT }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="bg-content1 rounded-lg border border-content3 flex">
          <MainContent {...detail} />

          <div className="hidden md:block md:border-l md:border-l-content3">
            <Aside
              slug={detail?.slug}
              submissionID={detail?.id?.toString()}
              createdAt={detail?.createdAt}
              upvote_count={detail?.upvote_count}
              user={detail?.user}
              upVoted={detail?.user_vote_status}
              board={detail?.submission_board}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[240px] pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-black" />
      </div>
    </div>
  );
}
