"use client";

import {
  Button,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { BsDot } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import ConfirmModal from "../../../(components)/ConfirmModal";
import CommnetBox from "./CommnetBox";
import { SubmissionCommetsT, SubmissionJantaT } from "../../../../types/product";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import Avatar from "../../../(components)/Avatar";
import { formatDate, getNameToDisplay, getUserName } from "../../../../utils/helpers";
import {
  likeSubmissionCommentApi,
  removeSubmissionCommentApi,
} from "../../../../network/api/product/roadmap";
import { ApiResType, Role } from "../../../../types/enum";
import { useAuth } from "../../../../context/AuthContext";
import EditBox from "./EditBox";
import { useProductDetail } from "../../context/ProductProvider";

export default function Comment({
  janta,
  comment,
  onRemove,
  onEditComment,
  submissionID,
  isReply = false,
  parentID,
}: {
  comment: SubmissionCommetsT;
  janta: SubmissionJantaT[];
  onRemove?: (id: number) => void;
  onEditComment?: ({
    c,
    id,
    media,
  }: {
    c?: string;
    id: number;
    media: any;
  }) => void;
  submissionID: string;
  isReply?: boolean;
  parentID?: number;
}) {
  const { token, user } = useAuth();
  const { productDetail } = useProductDetail();
  const [cmnt, setCmnt] = useState(comment);

  const [isMenu, setIsMenu] = useState(false);
  const [isEdit, setIsIdit] = useState(false);
  const [dModal, setDModal] = useState(false);
  const [dLoading, setDLoading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(Boolean(comment?.like_status));
  }, [comment?.like_status]);

  async function onLike() {
    try {
      const res = await likeSubmissionCommentApi({
        token,
        comment_id: comment?.id?.toString(),
        status: liked ? "0" : "1",
      });
      if (res.type === ApiResType.SUCCESS) {
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error, "err");
    }
  }

  async function onCommentEdit({
    c,
    id,
    media,
  }: {
    c?: string;
    id: number;
    media?: any;
  }) {
    if (isReply) {
      setCmnt((s) => ({
        ...s,
        ...(c && { text: c }),
        ...(media && { comment_media: media }),
      }));
    } else if (onEditComment) {
      onEditComment({ c, id, media });
    }

    setIsIdit(false);
  }

  async function onCommentDelete() {
    try {
      setDLoading(true);
      const res = await removeSubmissionCommentApi({
        token,
        comment_id: comment?.id?.toString(),
        product_id: productDetail?.id?.toString(),
        submission_id: submissionID,
      });
      if (res.type === ApiResType.SUCCESS) {
        if (onRemove) {
          onRemove(comment?.id);
        }
      }
      setDLoading(false);
      setDModal(false);
    } catch (error) {
      setDLoading(false);
      setDModal(false);
      console.log(error, "err");
    }
  }

  useEffect(() => {
    setCmnt(comment);
  }, [comment?.reply, comment]);

  const formattedString = cmnt.text.split(/(@\w+)/g).map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className="text-primary">
          {part}
        </span>
      );
    }
    return part;
  });

  return (
    <div className="flex gap-2 my-1">
      {isReply && (
        <div>
          <Divider orientation="vertical" />
        </div>
      )}
      <div className="mt-2 w-full rounded-lg pt-3 px-3">
        <div className="flex justify-between ">
          <div className="flex w-full gap-2">
            <Avatar
              image={cmnt?.user_detail?.profile_pic || ""}
              name={getUserName(cmnt?.user_detail)}
            />
            <div className="w-full">
              <div className="mb-2">{getNameToDisplay(cmnt?.user_detail)}</div>
              {isEdit ? (
                <div className="w-full">
                  <EditBox
                    onSubmit={onCommentEdit}
                    parentID={parentID}
                    submissionID={submissionID}
                    placeholder="Update Reply"
                    onCancel={() => setIsIdit(false)}
                    info={cmnt}
                  />
                </div>
              ) : (
                <div>
                  <div className="text-[15px] text-foreground/60 ">
                    {formattedString}
                  </div>
                  {cmnt?.comment_media?.length > 0 && (
                    <div className="flex gap-3">
                      {cmnt?.comment_media?.map((m) => {
                        return (
                          <div className="mt-2" key={m.id}>
                            <img
                              src={
                                m.media_url ||
                                (m?.file && URL.createObjectURL(m?.file))
                              }
                              className="w-[200px] h-[200px] object-cover rounded-lg"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {!isEdit &&
            (Number(cmnt?.user_id) === Number(user?.id) ||
              user?.role === Role.ADMIN ||
              productDetail?.role === Role.ADMIN ||
              productDetail?.role === Role.OWNER) && (
              <div>
                <Popover
                  isOpen={isMenu}
                  onOpenChange={(open) => setIsMenu(open)}
                  classNames={{
                    base: "w-auto px-3",
                  }}
                  placement="bottom-start"
                >
                  <PopoverTrigger>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="flat"
                      radius="full"
                      className="cursor-pointer text-foreground/70 self-start"
                    >
                      <PiDotsThreeOutlineVerticalBold />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Listbox
                      aria-label="Actions"
                      onAction={(key) => {
                        setIsMenu(false);
                      }}
                      itemClasses={{
                        base: "first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 py-2 bg-surface1 px-3",
                      }}
                    >
                      <ListboxItem onClick={() => setIsIdit(true)} key="edit">
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
              </div>
            )}
        </div>
        {!isEdit && (
          <div
            className="mt-[6px] ml-[10px] text-[13px] text-foreground/60 flex items-center 
          gap-[3px] "
          >
            <div
              onClick={onLike}
              className="hover:text-primary hover:scale-[1.1] transition-all cursor-pointer"
            >
              {!liked ? (
                <div onClick={() => setLiked(true)}>
                  <RiHeart2Line className="text-md" />
                </div>
              ) : (
                <div onClick={() => setLiked(false)}>
                  <RiHeart2Fill className="text-md text-primary" />
                </div>
              )}{" "}
            </div>
            <BsDot />
            <div className="">{formatDate(cmnt?.createdAt)}</div>
            <BsDot />
            <div
              onClick={() => {
                setIsReplying(!isReplying);
              }}
              className=" cursor-pointer hover:text-foreground/80 transition-all"
            >
              Reply
            </div>
          </div>
        )}

        {isReplying && !isEdit && (
          <CommnetBox
            janta={janta}
            submissionID={submissionID}
            placeholder="Add a reply"
            onCancel={() => setIsReplying(false)}
            onSubmit={(c: SubmissionCommetsT) => {
              setCmnt((s) => ({ ...s, reply: [c, ...(s?.reply || [])] }));
              setIsReplying(false);
            }}
            parentID={cmnt.id}
          />
        )}

        {cmnt?.reply &&
          cmnt?.reply?.length > 0 &&
          cmnt?.reply?.map((r) => {
            return (
              <div className="ml-4" key={r.id}>
                <Comment
                  janta={janta}
                  comment={r}
                  submissionID={submissionID}
                  isReply
                  parentID={cmnt.id}
                  onRemove={(id: number) => {
                    setCmnt((s) => ({
                      ...s,
                      reply: s?.reply?.filter((e) => e.id !== id),
                    }));
                  }}
                />
              </div>
            );
          })}

        {dModal && (
          <ConfirmModal
            isOpen={dModal}
            loading={dLoading}
            onClose={() => setDModal(false)}
            onConfirm={onCommentDelete}
            title={`Do you want to delete this ${
              isReply ? "reply" : "comment"
            }?`}
          />
        )}
      </div>
    </div>
  );
}
