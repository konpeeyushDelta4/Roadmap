"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useAuth } from "../../../../../context/AuthContext";
import { editSubmissionCommentApi } from "../../../../../network/api/product/roadmap";
import React, { useEffect, useState } from "react";
import { ApiResType } from "../../../../../types/enum";
import { SubmissionCommetsT } from "../../../../../types/product";
import { useProductDetail } from "../../context/ProductProvider";
import { BsFillImageFill } from "react-icons/bs";
import { ImagesT } from "./CommnetBox";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import ImageUploader from "../../../../(components)/ImageUploader";

export default function EditBox({
  onSubmit,
  label = "",
  placeholder = "",
  submissionID,
  parentID,
  onCancel,
  info,
}: {
  label?: string;
  onSubmit: ({ c, id, media }: { c?: string; id: number; media?: any }) => void;
  placeholder?: string;
  submissionID: string;
  parentID?: number;
  onCancel?: () => void;
  info?: SubmissionCommetsT;
}) {
  const { token } = useAuth();
  const { productDetail } = useProductDetail();
  const [comment, setComment] = useState({} as SubmissionCommetsT);
  const [images, setImages] = useState<ImagesT[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);

  async function onComment() {
    if (!token || !comment?.id) return;

    try {
      onSubmit({
        c: comment.text,
        id: comment.id,
        media: images,
      });
      const res = await editSubmissionCommentApi({
        token,
        comment_id: comment?.id?.toString(),
        comment: comment.text,
        comment_media_id: imageIds.join(","),
        product_id: productDetail?.id?.toString(),
        submission_id: submissionID,
        ...(parentID ? { parent_comment_id: parentID?.toString() } : {}),
      });

      if (res.type === ApiResType.ERROR) {
        if (info?.id && info?.text) {
          onSubmit({
            id: info?.id,
            c: info?.text,
            media: info?.comment_media,
          });
        }
      }
    } catch (error) {
      console.log(error, "err");
    }
  }

  useEffect(() => {
    console.log(images, "images");
  }, [images]);

  useEffect(() => {
    if (!info) return;
    setComment((s) => ({ ...s, ...info }));
    setImages(
      info?.comment_media?.map((i) => ({
        id: i?.id,
        media_url: i?.media_url,
        localId: v4(),
        content_type: i?.content_type,
      })) || []
    );
  }, [info]);

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
        localId: v4(),
      };
      fileList.push(fileObject);
    }
    setImages((s) => [...s, ...fileList]);
    e.target.value = "";
  };

  useEffect(() => {
    setImageIds(images.filter((i) => i.id).map((i) => i.id));
  }, [images]);

  return (
    <div className="w-full mt-2">
      <Textarea
        label={label}
        labelPlacement="outside"
        classNames={{
          label: "text-foreground/90",
        }}
        autoFocus
        color="primary"
        variant="bordered"
        placeholder={placeholder}
        value={comment.text || ""}
        onChange={(e) => setComment((s) => ({ ...s, text: e.target.value }))}
        minRows={3}
        maxRows={7}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onComment();
            setComment({} as SubmissionCommetsT);
          }
          if (e.key === "Escape" && onCancel) {
            onCancel();
          }
        }}
      />

      <div className="my-2 flex justify-between gap-2 items-start">
        <div className="w-full">
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
                      parentId={comment.id}
                      submissionID={submissionID}
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

        <div className="text-end flex gap-1 ">
          <Button
            size="sm"
            color="primary"
            isDisabled={!comment.text}
            onClick={() => {
              onComment();
              setComment({} as SubmissionCommetsT);
            }}
          >
            Submit
          </Button>
          {onCancel && (
            <Button
              size="sm"
              onClick={() => {
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
