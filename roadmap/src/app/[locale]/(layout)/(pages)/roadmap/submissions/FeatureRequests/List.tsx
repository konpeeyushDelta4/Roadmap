"use client";
import React, { useState } from "react";
import { SubmissionDetailT, SubmissionBoardT } from "../../../../../../../types/product";
import ListItem from "./ListItem";
import { Spinner } from "@nextui-org/react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Feature_requests } from "../../../../../../../utils/helpers";

export default function FeatureRequestsList({
  list,
  loading,
  loadMoreData,
  hasMore,
  onRemove,
}: {
  list: SubmissionDetailT[];
  loading: boolean;
  onRemove: () => void;
  loadMoreData: () => void;
  hasMore: boolean;
  setBoardFilter: React.Dispatch<React.SetStateAction<SubmissionBoardT>>;
}) {
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadMoreData,
    rootMargin: "200px 0px 0px 0px",
    delayInMs: 500,
  });
  return (
    <div className="flex-1">
      <div className="">
        {!loading && list?.length === 0 && (
          <div className="flex flex-col items-center justify-center my-14 font-medium text-foreground/50 text-lg">
            {/* <div className="animate-ping text-3xl">💩</div> */}
            <div>No Submissions yet </div>
          </div>
        )}
        {list?.length > 0 && (
          <div className="my divide-y divide-default-100">
            {list.map((item, indx) => {
              return (
                <ListItem
                  key={indx}
                  data={item}
                  onDelete={(id: number) => {
                    onRemove();
                    Feature_requests.setData(
                      Feature_requests.data?.filter((i) => i.id !== id)
                    );
                  }}
                />
              );
            })}
          </div>
        )}

        {(loading || hasMore) && (
          <div ref={infiniteRef} className="flex w-full justify-center my-4">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
