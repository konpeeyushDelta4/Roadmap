"use client";
import { useAuth } from "../../../../../../../context/AuthContext";
import { addSubmissionUpvoteApi } from "../../../../../../../network/api/product/roadmap";
import React, { useEffect, useState } from "react";
import { TbChevronUp } from "react-icons/tb";
import { ApiResType } from "../../../../../../../types/enum";
import { SubmissionDetailT } from "../../../../../../../types/product";

export default function VoteUp({ data }: { data: SubmissionDetailT }) {
  const { token, setLoginOpen } = useAuth();
  const [upvote, setUpvote] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    setUpvote(Boolean(Number(data?.user_vote_status)));
    setVoteCount(Number(data?.upvote_count));
  }, [data?.user_vote_status, data?.upvote_count]);

  async function voteUp() {
    if (!token) {
      setLoginOpen(true);
      return;
    }
    try {
      setUpvote(!upvote);
      setVoteCount(upvote ? voteCount - 1 : voteCount + 1);
      const res = await addSubmissionUpvoteApi({
        token,
        submission_id: data?.id?.toString(),
        status: upvote ? "0" : "1",
      });

      if (res?.type === ApiResType.SUCCESS) {
        await fetch(`/api/revalidateRoadmapDetail?slug=${data?.slug}`, {
          method: "POST",
        });
        await fetch(`/api/revalidateRoadmaps`, {
          method: "POST",
        });
      }
    } catch (error) {
      console.log(error, "something went wrong");
    }
  }

  return (
    <div
      onClick={voteUp}
      className={`flex cursor-pointer border-1 p-1 flex-col group/vote justify-center items-center text-foreground/40 ${
        upvote
          ? " text-primary border-primary bg-primary/10"
          : "hover:text-primary/80 hover:border-primary/50 border-default hover:bg-primary/5 bg-foreground/5"
      } transition-all rounded-md h-12 sm:h-16 min-w-[40px] sm:min-w-[48px]`}
    >
      <TbChevronUp />
      <div className="text-base sm:text-xl">{voteCount.toString()}</div>
    </div>
  );
}
