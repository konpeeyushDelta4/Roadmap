"use client";
import { Button, Chip, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import React, { useState } from "react";
import { SubmissionDetailT, topicT } from "../../../../../../types/product";
import { RxDot } from "react-icons/rx";
import { ApiResType, Role } from "../../../../../../types/enum";
import { useAuth } from "../../../../../../context/AuthContext";
import { removeSubmissionApi } from "../../../../../../network/api/product/roadmap";

import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import ConfirmModal from "../../../../../(components)/ConfirmModal";
import { dateFormater } from "../../../../../../utils/helpers";
import Link from "next/link";
import { useProductDetail } from "../../../../context/ProductProvider";
import useCustomRouter from "../../../../../../hooks/useCustomRouter";
import BoardChip from "../../../../components/BoardChip";
import VoteUp from "./VoteUp";

export default function ListItem({ data, onDelete }: { data: SubmissionDetailT; onDelete: (id: number) => void }) {
  const { token, user } = useAuth();
  const { productDetail } = useProductDetail();

  const [dModal, setDModal] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [dloading, setDloading] = useState(false);
  const router = useCustomRouter();
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : typeof window !== "undefined" ? window.location.host : "";

  async function deleteSubmission() {
    if (!token || !data?.id || !host) return;
    try {
      setDloading(true);
      const res = await removeSubmissionApi({
        token,
        submission_id: data?.id?.toString(),
        domain: host || "",
      });

      if (res?.type === ApiResType.SUCCESS) {
        onDelete(data?.id);
        await fetch(`/api/revalidateRoadmaps`, {
          method: "POST",
        });
      }
      setDloading(false);
      setDModal(false);
    } catch (err) {
      setDloading(false);
      console.log(err, "something went wrong");
    }
  }

  const topics =
    data?.submission_topic?.reduce((acc: string[], crr: topicT) => {
      acc.push(crr?.name);
      return acc;
    }, []) || [];

  const isCreator = Number(user?.id || 0) === +data.user_id;

  return (
    <>
      <div className="relative hover:bg-foreground/[0.07] p-3 px-0 sm:p-6 rounded-md transition-all">
        <Link className="absolute z-[5] top-0 left-0 h-full w-full" href={`/post/${data?.slug}-${data?.post_uid}` || ""} />
        <div className="flex gap-3 sm:gap-5">
          <div className="relative z-[10]">
            <VoteUp data={data} />
          </div>
          <div className="hidden self-stretch md:block">
            <div style={{ background: data?.submission_board?.color }} className="w-[3px] rounded-sm self-stretch h-full" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex gap-1 items-center text-foreground/50 text-sm pb-2">
                  <div className="font-medium">{data?.user?.first_name || data?.user?.username}</div>
                  <RxDot/>
                  <div>
                    {dateFormater({
                      date: data?.createdAt,
                      formatt: "dd MMM",
                    })}
                  </div>
                </div>
                <div className="text-xl">{data?.feature_name}</div>
                <div className="text-sm text-foreground/50 sm:max-w-[95%] pt-1">{data?.description}</div>
                <div className="mt-3 space-x-1">
                  {topics.map((t, indx) => {
                    return (
                      <Chip key={indx} className="text-sm" variant="flat" color="primary">
                        {t}
                      </Chip>
                    );
                  })}
                </div>
                <div className="pt-3 sm:hidden ">
                  <BoardChip sx="rounded-md" color={data?.submission_board?.color || "#925fff"} name={data?.submission_board?.name || ""} />
                </div>
              </div>
              <div className="relative z-[10] capitalize flex gap-1 items-center whitespace-nowrap self-start text-foreground/50">
                <div className="hidden sm:block">
                  <BoardChip color={data?.submission_board?.color || "#925fff"} name={data?.submission_board?.name || ""} />
                </div>
                {(productDetail?.role === Role.OWNER || user?.role === Role.ADMIN || isCreator) && (
                  <Popover
                    isOpen={isMenu}
                    onOpenChange={(open) => setIsMenu(open)}
                    classNames={{
                      base: "w-auto px-3",
                    }}
                    placement="bottom-start"
                  >
                    <PopoverTrigger>
                      <Button size="sm" isIconOnly variant="flat" radius="full" className="cursor-pointer text-foreground/70 self-start">
                        <PiDotsThreeOutlineVerticalBold />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 shadow-none bg-content1 border border-foreground/5">
                      <Listbox
                        aria-label="Actions"
                        onAction={(key) => {
                          setIsMenu(false);
                        }}
                        itemClasses={{
                          base: " first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 py-2 bg-surface1 px-3",
                        }}
                      >
                        <ListboxItem onPress={() => router.push(`/roadmap/update/${data?.post_uid}`)} key="edit">
                          Edit
                        </ListboxItem>
                        <ListboxItem
                          onPress={() => {
                            setDModal(true);
                          }}
                          key="delete"
                          className="hover:text-white text-danger"
                          color="danger"
                        >
                          Remove
                        </ListboxItem>
                      </Listbox>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {dModal && <ConfirmModal isOpen={dModal} onClose={() => setDModal(false)} onConfirm={deleteSubmission} title="Do you want to delete this submission?" loading={dloading} />}
    </>
  );
}
