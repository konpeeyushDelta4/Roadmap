"use client";

import React, { useEffect, useState } from "react";
import CommnetBox from "./CommnetBox";
import Feed from "./Feed";
import { useAuth } from "context/AuthContext";
import { getSubmissionCommentApi } from "network/api/product/roadmap";
import { ApiResType } from "types/enum";
import { SubmissionCommetsT, SubmissionJantaT } from "types/product";

export default function Comments({
  submissionID,
  janta,
}: {
  submissionID: string;
  janta?: SubmissionJantaT[];
}) {
  const { token } = useAuth();
  const [list, setList] = useState([] as SubmissionCommetsT[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!submissionID) {
      setLoading(false);
      return;
    }
    async function getComments() {
      try {
        setLoading(true);
        const res = await getSubmissionCommentApi({
          token,
          submission_id: submissionID,
        });
        setLoading(false);
        if (res.type === ApiResType.SUCCESS) setList(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error, "err");
      }
    }
    getComments();
  }, [token, submissionID]);

  async function onEditComment({
    c,
    id,
    media,
  }: {
    c?: string;
    id: number;
    media?: any;
  }) {
    setList((s: SubmissionCommetsT[]) => {
      return s.map((e: SubmissionCommetsT) => {
        if (e.id === id) {
          return {
            ...e,
            ...(c && { text: c }),
            ...(media && { comment_media: media }),
          };
        } else {
          return e;
        }
      });
    });
  }

  return (
    <div className="my-6">
      <CommnetBox
        janta={janta || []}
        placeholder="Write a comment"
        onSubmit={(c: SubmissionCommetsT) =>
          setList((s: SubmissionCommetsT[]) => [c, ...(s || [])])
        }
        submissionID={submissionID}
      />
      <Feed
        janta={janta}
        loading={loading}
        list={list}
        onRemove={(id: number) =>
          setList(list.filter((e: SubmissionCommetsT) => e.id !== id))
        }
        submissionID={submissionID}
        onEditComment={onEditComment}
      />
    </div>
  );
}
