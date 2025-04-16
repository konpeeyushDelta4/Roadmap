import React, { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/navigation";
import { SubmissionBoardT } from "../../../../../../../types/product";
import { useDomainCtx } from "../../../../context/DomainCtxProvider";
import { cn } from "../../../../../../../utils/helpers";

export default function BoardFilters({ setBoardFilter, boardFilter, onSelect }: { setBoardFilter: Dispatch<SetStateAction<SubmissionBoardT>>; boardFilter: SubmissionBoardT; onSelect?: () => void }) {
  const router = useRouter();
  const { boards } = useDomainCtx();

  const commonS = "flex w-full  text-sm hover:bg-foreground/5 transition-all p-2 px-3 text-foreground/50 cursor-pointer rounded-md items-center gap-2 capitalize";
  return (
    <ul className="">
      <li
        onClick={() => {
          setBoardFilter({} as SubmissionBoardT);
          router.push(`/roadmap/submissions`);
          if (onSelect) {
            onSelect();
          }
        }}
      >
        <div className={cn(`${boardFilter && Object?.keys(boardFilter)?.length === 0 && "bg-foreground/5"}`, commonS)}>
          <div className="w-[3px] bg-primary rounded-sm self-stretch" />
          All
        </div>
      </li>
      {boards.map((b, indx) => {
        return (
          <li
            onClick={() => {
              setBoardFilter(b);
              if (onSelect) {
                onSelect();
              }
              if (b.name) {
                router.push(`/roadmap/submissions?board=${b.slug}`);
              }
            }}
            key={indx}
          >
            <div className={`${boardFilter?.name === b.name && "bg-foreground/5"} ${commonS}`}>
              <div style={{ background: b.color }} className="w-[3px] rounded-sm self-stretch" />
              {b.name}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
