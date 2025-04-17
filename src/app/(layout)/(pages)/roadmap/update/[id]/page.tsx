import React from "react";
import CreateAndUpdateForm from "./UpdateReq";
import { Metadata } from "next";
import { content } from "../../../../components/variants";

export default function UpdateRoadmap({ params }: { params: { id: string } }) {
  return (
    <div className={content({ class: "py-10" })}>
      <CreateAndUpdateForm post_uid={params?.id} />
    </div>
  );
}

export const metadata: Metadata = {
  robots: "noindex",
};
