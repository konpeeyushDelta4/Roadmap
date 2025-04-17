"use client";
import Comments from "../../../../components/Comments";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmissionDetailT, SubmissionJantaT, topicT } from "../../../../../../types/product";
import Aside from "./Aside";
import { Chip } from "@heroui/react";
import { Feature_requests } from "../../../../../../utils/helpers";
import useCustomRouter from "../../../../../../hooks/useCustomRouter";
import { useAuth } from "../../../../../../context/AuthContext";
import { getSubmissionParticipantApi } from "../../../../../../network/api/product/roadmap";
import { ApiResType } from "../../../../../../types/enum";

export default function MainContent({ user_vote_status, upvote_count, user, submission_board, id, feature_name, description, createdAt, submission_topic, submission_media }: SubmissionDetailT) {
  const { token } = useAuth();
  const topics =
    submission_topic?.reduce((acc: string[], crr: topicT) => {
      acc.push(crr?.name);
      return acc;
    }, []) || [];

  const router = useCustomRouter();

  const [janta, setJanta] = useState([] as SubmissionJantaT[]);

  useEffect(() => {
    if (!token || !id) return;
    async function getJanta() {
      try {
        const res = await getSubmissionParticipantApi({
          submission_id: id?.toString(),
          token,
        });
        if (res.type === ApiResType.SUCCESS) {
          setJanta(res.data);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
    getJanta();
  }, [token, id]);

  return (
    <div className="p-5 pb-48 flex-1">
      <div>
        <div
          onClick={() => {
            Feature_requests.setRedirected(true);
            router.back();
          }}
          className="flex gap-1 items-center cursor-pointer text-foreground/50 text-sm hover:text-foreground/90 transition-all w-fit"
        >
          <ChevronLeft />
          Back to all Features
        </div>
        <h1 className="text-xl font-semibold my-3">{feature_name}</h1>
        <p className="text-foreground/50">{description}</p>

        <div className="media mt-6 flex gap-2 flex-wrap">
          {submission_media?.map((i) => {
            const boxClass = "rounded-medium overflow-hidden h-[120px] aspect-video bg-black relative";

            if (i.content_type === "image") {
              return (
                <a href={i.media_url} key={i.id} className={[boxClass, "inline-block"].join(" ")} target="_blank">
                  <img src={i.media_url} className="h-full w-full hover:scale-105 transition-all object-cover" alt={feature_name} />
                </a>
              );
            } else if (i.content_type === "video") {
              return (
                <a href={i.media_url} target="_blank" className={[boxClass, "inline-block"].join(" ")} key={i.id}>
                  <video src={i.media_url} className="hover:scale-105 transition-all h-full w-full object-cover" autoPlay muted></video>
                </a>
              );
            } else {
              return null;
            }
          })}
        </div>

        {topics?.length > 0 && (
          <div className="mt-3 space-x-1">
            {topics?.map((t, indx) => {
              return (
                <Chip key={indx} className="text-sm" variant="flat" color="primary">
                  {t}
                </Chip>
              );
            })}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <Aside slug={feature_name} submissionID={id?.toString()} upVoted={user_vote_status} createdAt={createdAt} upvote_count={upvote_count} user={user} board={submission_board} />
      </div>

      <Comments submissionID={id?.toString()} janta={janta} />
      {/* {dModal && (
        <ConfirmModal
          isOpen={dModal}
          onClose={() => setDModal(false)}
          onConfirm={deleteRoadmap}
          title="Do you want to delete this roadmap?"2
          loading={dloading}
        />
      )} */}
    </div>
  );
}
