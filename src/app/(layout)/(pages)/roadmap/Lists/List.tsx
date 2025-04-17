"use client";

import { SubmissionDetailT } from "../../../../../types/product";
import Card from "./Card";
import { DOMAIN_TOPBAR_HEIGHT } from "../../../../../utils/ui";

const List = ({
  boardlist,
  name,
  color,
}: {
  boardlist: SubmissionDetailT[];
  name: string;
  color: string;
}) => {
  const CardHeight = `calc(100vh - (${DOMAIN_TOPBAR_HEIGHT}px + 90px )`;
  return (
    <div className="min-w-[370px] flex-1 border border-content2 relative bg-content1/50 mb-2 rounded-xl overflow-y-hidden">
      <div style={{ height: CardHeight }} className="flex flex-col">
        <div
          style={{
            borderBottomColor: color || "transparent",
          }}
          className="h-14 border-b-2 flex items-center bg-content1 top-0"
        >
          <h4 className="capitalize font-medium py-1 px-2 rounded-md">
            {name}
          </h4>
        </div>
        <div className="flex-1 overflow-auto rounded-xl p-3 pr-2">
          <div className="flex flex-col gap-3">
            {boardlist.map((i) => {
              return <Card {...i} key={i.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
