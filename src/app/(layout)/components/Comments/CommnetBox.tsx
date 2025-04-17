"use client";
import { Button, Textarea } from "@heroui/react";
import { useAuth } from "../../../../context/AuthContext";
import { addSubmissionCommentApi } from "../../../../network/api/product/roadmap";
import React, { useEffect, useMemo, useState } from "react";
import { ApiResType } from "../../../../types/enum";
import { SubmissionCommetsT, SubmissionJantaT } from "../../../../types/product";
import { toast } from "react-toastify";
import { BsFillImageFill } from "react-icons/bs";
import ImageUploader from "../../../(components)/ImageUploader";
import { Mention, MentionItem, MentionsInput } from "react-mentions";
import classnames from "./input.module.scss";
import styled from "styled-components";

export type ImagesT = {
  file?: any;
  name?: any;
  id?: any;
  media_url?: any;
  localId?: any;
};

export default function CommnetBox({
  onSubmit,
  label = "",
  placeholder = "",
  submissionID,
  janta,
  parentID,
  onCancel,
}: {
  label?: string;
  onSubmit: (c: SubmissionCommetsT) => void;
  placeholder?: string;
  submissionID: string;
  janta: SubmissionJantaT[];
  parentID?: number;
  onCancel?: () => void;
}) {
  const { token, setLoginOpen } = useAuth();
  const [comment, setComment] = useState({} as SubmissionCommetsT);
  const [images, setImages] = useState<ImagesT[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [mentioned, setMentioned] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function onComment() {
    if (!token) {
      setLoginOpen(true);
      return;
    }

    if (loading) return;

    const uniQuesIds = Array.from(new Set(mentioned));
    const submissionUrl =
      typeof window !== "undefined" ? window.location.href : "";

    try {
      setLoading(true);
      const res = await addSubmissionCommentApi({
        token,
        mention_ids: uniQuesIds.join(",") || "",
        submission_url: submissionUrl,
        comment: comment.plainVal || "",
        comment_media_id: imageIds.join(","),
        submission_id: submissionID,
        ...(parentID ? { parent_comment_id: parentID?.toString() } : {}),
      });

      if (res.type === ApiResType.SUCCESS) {
        onSubmit(res.data);
        setComment({} as SubmissionCommetsT);
        setImages([]);
      }
    } catch (error) {
      console.log(error, "err");
    } finally {
      setLoading(false);
    }
  }

  const onImagePik = (e: any) => {
    const selectedFiles: any = e.target.files;
    const fileList: any = [];

    if (images.length >= 3 || e.target?.files?.length > 3) {
      toast.error("Maximum 3 images are allowed");
      return;
    }

    for (let i = 0; i < 3; i++) {
      const file = selectedFiles[i];

      if (!file) {
        break;
      }
      const fileObject = {
        fileName: file.name,
        file: file,
        localId: Date.now() + file.name,
      };
      fileList.push(fileObject);
    }
    setImages((s) => [...s, ...fileList]);
    e.target.value = "";
  };

  useEffect(() => {
    setImageIds(images.filter((i) => i.id).map((i) => i.id));
  }, [images]);

  const mentionData = useMemo(() => {
    return janta?.map((e) => ({ id: e.id, display: e.username })) || [];
  }, [janta]);

  function onChange(value: string, plainVal: string, mentions: MentionItem[]) {
    setComment((s) => ({ ...s, text: value, plainVal }));
    setMentioned(mentions.map((m) => m.id));
  }

  return (
    <div className="w-full my-2">
      <StyledInputDiv>
        <MentionsInput
          classNames={classnames}
          placeholder={placeholder}
          value={comment.text || ""}
          onChange={(e, nv, val, mentions) => {
            onChange(e.target.value, val, mentions);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onComment();
            }
            if (e.key === "Escape" && onCancel) {
              onCancel();
            }
          }}
        >
          <Mention
            appendSpaceOnAdd={true}
            trigger="@"
            displayTransform={(_, display) => `@${display}`}
            renderSuggestion={(
              sgg,
              search,
              highlightedDisplay,
              indx,
              focused
            ) => (
              <div className={`user ${focused ? "focused" : ""}`}>
                {highlightedDisplay}
              </div>
            )}
            data={mentionData}
          />
        </MentionsInput>
      </StyledInputDiv>

      <div className="flex items-start gap-3  my-2">
        <div className=" w-full pt-2">
          {images.length > 0 && (
            <div className="pb-2 mb-2 px-3 flex gap-3 items-start">
              {images.map((i, ind) => {
                return (
                  <div
                    className="h-[140px] aspect-square"
                    key={i.localId + ind}
                  >
                    <ImageUploader
                      key={i.localId + ind}
                      {...i}
                      type="submission_comment_image"
                      onRemove={(id: any) => {
                        setImages((s) =>
                          s.filter((i2) => !(i2.id === id || i2.localId === id))
                        );
                      }}
                      onUpload={(obj: any) => {
                        setImages((s) =>
                          s.map((i2) => {
                            if (i2.localId === i.localId) {
                              return {
                                ...i2,
                                id: obj.id,
                              };
                            } else {
                              return i2;
                            }
                          })
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-5 px-3">
            {/* <input type="file" onChange={onImagePik} /> */}
            {/* <label htmlFor="SelectFile"> */}
            <div className="relative bg-foreground/10 p-3 inline-block rounded-md cursor-pointer group hover:bg-foreground/30 transition-all">
              <BsFillImageFill className="text-foreground/50 group-hover:text-textLight" />
              <input
                className="absolute top-0 left-0 w-full h-full opacity-0"
                type="file"
                multiple
                max={3}
                id="SelectFile"
                onChange={onImagePik}
              />
            </div>
            {/* </label> */}
          </div>
        </div>
        <div className="text-end flex gap-1">
          <Button
            size="sm"
            color="primary"
            isLoading={loading}
            isDisabled={!comment.text}
            onPress={() => {
              onComment();
              setComment({} as SubmissionCommetsT);
            }}
          >
            {token ? "Submit" : "Login to comment"}
          </Button>
          {onCancel && (
            <Button
              size="sm"
              onPress={() => {
                setComment({} as SubmissionCommetsT);
                onCancel();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const StyledInputDiv = styled.div`
  strong {
    background: rgb(var(--primary-color));
  }
  div:has(> ul) {
    background-color: transparent !important;
  }

  ul {
    max-height: 300px;
    overflow-y: auto;
  }

  li {
    .user.focused {
      color: white;
    }
  }
`;
