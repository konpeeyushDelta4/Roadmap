"use client";
import { Button, Divider } from "@heroui/react";
import BoardChip from "../../../../components/BoardChip";
import Avatar from "../../../../../(components)/Avatar";
import { useAuth } from "../../../../../../context/AuthContext";
import { format } from "date-fns";
import { BellOff, BellRing, ChevronUp } from "lucide-react";
import { addSubmissionUpvoteApi } from "../../../../../../network/api/product/roadmap";
import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { ApiResType } from "../../../../../../types/enum";
import { SubmissionDetailT, SubmissionBoardT } from "../../../../../../types/product";
import { getNameToDisplay } from "../../../../../../utils/helpers";

export default function Aside({
  createdAt,
  upvote_count,
  user,
  upVoted,
  slug,
  board,
  submissionID,
}: {
  submissionID: string;
  createdAt: string;
  board: SubmissionBoardT;
  upvote_count: string;
  user: SubmissionDetailT["user"];
  upVoted: string;
  slug: string;
}) {
  const { token, setLoginOpen } = useAuth();
  const [voteCount, setVoteCount] = useState(Number(upvote_count) || 0);
  const [isVoted, setIsVoted] = useState(Boolean(Number(upVoted)) || false);

  async function voteUp() {
    if (!token) {
      setLoginOpen(true);
      return;
    }
    if (!submissionID) return;
    try {
      setIsVoted(!isVoted);
      setVoteCount(isVoted ? voteCount - 1 : voteCount + 1);
      const res = await addSubmissionUpvoteApi({
        token,
        submission_id: submissionID,
        status: isVoted ? "0" : "1",
      });

      if (res.type === ApiResType.SUCCESS) {
        await fetch(`/api/revalidateRoadmapDetail?slug=${slug}`, {
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

  useEffect(() => {
    setIsVoted(Boolean(Number(upVoted)) || false);
    setVoteCount(Number(upvote_count) || 0);
  }, [upVoted, upvote_count]);

  function formateDate(date: string) {
    if (!date) return;
    const parsedDate = new Date(date);
    return format(parsedDate, "dd MMM, yyyy");
  }

  return (
    <div className="md:pb-48 md:p-5 basis-[20%]">
      <div className={itemS}>
        <div className={labelS}>Upvotes</div>
        <div className={valueS}>
          <div onClick={voteUp} className={voteUpBtnV({ state: isVoted ? "voted" : "notVoted" })}>
            <ChevronUp width={20} />
            {voteCount}
          </div>
        </div>
      </div>
      <div className={itemS}>
        <div className={labelS}>Status</div>
        <div className={valueS}>
          <BoardChip color={board?.color || "#925fff"} name={board?.name || ""} />
        </div>
      </div>
      <Divider className="mb-3" />
      <div className={itemS}>
        <div className={labelS}>Created by</div>
        <div className={valueS}>
          {user && <Avatar classNames="mb-1" image={user?.profile_pic || ""} name={user?.name || user?.first_name || ""} />}
          {getNameToDisplay(user)}
        </div>
      </div>
      <div className={itemS}>
        <div className={labelS}>Posted on</div>
        <div className={valueS}>{formateDate(createdAt)}</div>
      </div>
      {/* <Divider className="mb-3" /> */}
      <Button disableRipple color="primary" onClick={voteUp} startContent={isVoted ? <BellOff width={17} /> : <BellRing width={17} />} className="w-full mt-2">
        {isVoted ? "Unsubscribe" : "Subscribe"}
      </Button>
    </div>
  );
}

const itemS = "flex gap-4 mb-3";
const labelS = "text-foreground/50 min-w-[40%] w-[120px] font-medium text-[15px]";
const valueS = "text-foreground/90 font-medium text-sm";

const voteUpBtnV = tv({
  base: "flex gap-1 items-center px-2 py-1 rounded-md border transition-all cursor-pointer",
  variants: {
    state: {
      voted: "bg-primary/20 text-primary/90 border-primary ",
      notVoted: "bg-content2/60 text-foreground/50 hover:text-foreground/80 border-content3 hover:bg-content2",
    },
  },
});
