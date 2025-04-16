"use client";
import React from "react";
import Comment from "./Comment";
import { Divider, Spinner } from "@nextui-org/react";
import { SubmissionCommetsT, SubmissionJantaT } from "../../../../../types/product";

export default function Feed({
  list,
  onRemove,
  submissionID,
  onEditComment,
  loading,
  janta,
}: {
  list: SubmissionCommetsT[];
  janta?: SubmissionJantaT[];
  submissionID: string;
  loading: boolean;
  onRemove: (id: number) => void;
  onEditComment: ({
    c,
    id,
    media,
  }: {
    c?: string;
    id: number;
    media?: any;
  }) => void;
}) {
  return (
    <div className="w-full">
      <div className="flex mb-1">Activity Feed</div>
      <Divider className="bg-primary" />
      {loading ? (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      ) : (
        list.map((c) => (
          <Comment
            janta={janta || []}
            submissionID={submissionID}
            key={c.id}
            comment={c}
            onRemove={onRemove}
            onEditComment={onEditComment}
          />
        ))
      )}
      {list.length === 0 && !loading && (
        <div className="flex justify-center my-2 text-foreground/60">
          <center className="my-7">
            <div className="max-w-[160px]">
              <img src="/images/fn.png" className=" opacity-50" />
            </div>
            <div className="mt-3">No comments yet</div>
          </center>
        </div>
      )}
    </div>
  );
}
