"use client";
import Link from "next/link";
import { ChatBubbleLeftIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { SubmissionDetailT } from "../../../../../../types/product";
import { tv } from "tailwind-variants";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../context/AuthContext";
import { addSubmissionUpvoteApi } from "../../../../../../network/api/product/roadmap";

const Card = ({
  feature_name,
  id,
  slug,
  comment_count,
  post_uid,
  upvote_count,
  user_vote_status,
}: SubmissionDetailT) => {
  const { token, setLoginOpen } = useAuth();
  const [voteCount, setVoteCount] = useState(Number(upvote_count) || 0);
  const [isVoted, setIsVoted] = useState(
    Boolean(Number(user_vote_status)) || false
  );

  async function voteUp() {
    if (!token) {
      setLoginOpen(true);
      return;
    }
    if (!slug) return;
    try {
      setIsVoted(!isVoted);
      setVoteCount(isVoted ? voteCount - 1 : voteCount + 1);
      await addSubmissionUpvoteApi({
        token,
        submission_id: id?.toString(),
        status: isVoted ? "0" : "1",
      });
    } catch (error) {
      console.log(error, "something went wrong");
    }
  }

  useEffect(() => {
    setIsVoted(Boolean(Number(user_vote_status)) || false);
    setVoteCount(Number(upvote_count) || 0);
  }, [user_vote_status, upvote_count]);

  return (
    <div className="relative rounded-medium bg-foreground/5 border border-foreground-200/80 flex p-3 overflow-hidden gap-2 group hover:bg-content2/70 hover:scale-[1.01] transition-all ">
      <Link
        href={`/post/${slug}-${post_uid}`}
        className="absolute inset-0 z-10 w-full h-full"
      />
      <div className="flex-1 flex flex-col">
        <h4 className="text-small font-medium leading-normal text-foreground-600">
          {feature_name}
        </h4>

        <div className="text-sm text-foreground-400  pt-2 flex gap-2 items-center mt-auto">
          <ChatBubbleLeftIcon height={18} />
          <span>{comment_count}</span>
        </div>
      </div>
      <div className="relative z-[20]">
        <button
          onClick={voteUp}
          className={voteUpBtnV({ state: isVoted ? "voted" : "notVoted" })}
        >
          <ChevronUpIcon height={20} />
          <span>{voteCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;

const voteUpBtnV = tv({
  base: "px-3 py-2 flex flex-col gap-2 border rounded-medium items-center justify-center  font-medium transition-all",
  variants: {
    state: {
      voted: "bg-primary/10 text-primary/90 border-primary/60 ",
      notVoted:
        "bg-content2/30 text-foreground/50 hover:text-foreground/80 border-content3 hover:bg-content2",
    },
  },
});
