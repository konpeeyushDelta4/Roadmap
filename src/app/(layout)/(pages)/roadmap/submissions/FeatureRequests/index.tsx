"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmissionDetailT, SubmissionBoardT } from "../../../../../../types/product";
import { Button, Input, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import FeatureRequestsList from "./List";
import { ChevronDown, Tags } from "lucide-react";
import { tv } from "tailwind-variants";
import { useDomainCtx } from "../../../../context/DomainCtxProvider";
import BoardFilters from "./BoardFilters";

export default function FeatureRequests({
  list,
  loading,
  hasMore,
  loadMoreData,
  onSearchChange,
  search,
  onFocus,
  topicFilter,
  setTopicFilter,
  setBoardFilter,
  boardFilter,
  onRemove,
}: {
  list: SubmissionDetailT[];
  loading: boolean;
  hasMore: boolean;
  loadMoreData: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFocus: () => void;
  topicFilter: number[];
  setTopicFilter: Dispatch<SetStateAction<number[]>>;
  setBoardFilter: Dispatch<SetStateAction<SubmissionBoardT>>;
  boardFilter: SubmissionBoardT;
  onRemove: () => void;
}) {
  const { topics } = useDomainCtx();
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mt-4 mb-2 md:mt-0 md:mb-5">
        <div className="text-lg font-medium">Submission</div>
        <div className="flex justify-end gap-2">
          <Input
            placeholder="Search"
            color="primary"
            variant="bordered"
            classNames={{
              inputWrapper: "h-auto py-2 border-1",
            }}
            onFocus={onFocus}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            size="sm"
          />
          <div className="relative">
            <div className="absolute top-[-22px] text-sm left-0">Board</div>
            <Popover
              isOpen={isMenu}
              onOpenChange={(open) => setIsMenu(open)}
              classNames={{
                base: "w-auto px-3",
              }}
              placement="bottom-start"
            >
              <PopoverTrigger>
                <Button variant="bordered" className="cursor-pointer relative flex-shrink-0 w-auto px-3 pr-2 border-1 capitalize text-foreground/70 self-start" endContent={<ChevronDown size={20} />}>
                  {boardFilter?.name?.replaceAll("_", " ") || "All"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2">
                <BoardFilters boardFilter={boardFilter} setBoardFilter={setBoardFilter} onSelect={() => setIsMenu(false)} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-shrink-0">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button className="border-[1px] text-foreground/60" isIconOnly startContent={<Tags width={18} />} variant="bordered" />
              </PopoverTrigger>
              <PopoverContent className="p-0 rounded-md">
                <Listbox className="p-0 overflow-hidden">
                  {topics.map((t, indx) => {
                    return (
                      <ListboxItem
                        className={listItemV({
                          class: `${indx === 0 ? "rounded-t-md" : ""} ${indx === topics.length - 1 ? "rounded-b-md" : ""}`,
                          state: topicFilter.includes(t.id) ? "selected" : "not_selected",
                        })}
                        onClick={() => {
                          if (topicFilter.includes(t.id)) {
                            setTopicFilter((p) => p.filter((i) => i !== t.id));
                          } else {
                            setTopicFilter((p) => [...p, t.id]);
                          }
                        }}
                        key={t?.id}
                      >
                        <div className="flex gap-3 text-sm justify-between">
                          <span> {t?.name}</span>
                          <span> {t?.count}</span>
                        </div>
                      </ListboxItem>
                    );
                  })}
                </Listbox>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="relative">
        <FeatureRequestsList onRemove={onRemove} loading={loading} list={list} hasMore={hasMore} loadMoreData={loadMoreData} setBoardFilter={setBoardFilter} />
      </div>
    </div>
  );
}

const listItemV = tv({
  base: "border-[1px] rounded-none p-2 cursor-pointer",
  variants: {
    state: {
      selected: "border-primary bg-primary/20 data-[hover=true]:bg-primary/20 data-[hover=true]:text-primary text-primary",
      not_selected: "text-foreground/60 data-[hover=true]:text-primary data-[selectable=true]:focus:bg-primary/5 data-[selectable=true]:focus:text-primary  border-transparent data-[hover=true]:bg-primary/10",
    },
  },
});
