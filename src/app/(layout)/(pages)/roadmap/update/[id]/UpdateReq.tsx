"use client";
import { Button, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useAuth } from "../../../../../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { getSubmissionDetailApi, updateSubmissionApi } from "../../../../../../network/api/product/roadmap";
import { ApiResType, Role } from "../../../../../../types/enum";

import Link from "next/link";
import { useProductDetail } from "../../../../context/ProductProvider";
import useCustomRouter from "../../../../../../hooks/useCustomRouter";
import { toast } from "react-toastify";
import { useDomainCtx } from "../../../../context/DomainCtxProvider";
import { BsFillImageFill } from "react-icons/bs";
import { v4 } from "uuid";
import ImageUploader from "../../../../../(components)/ImageUploader";
import { Switcher } from "../../../../../(components)/Switcher";

export default function UpdateReq({ post_uid }: { post_uid?: string }) {
  const { token, user } = useAuth();
  const { productDetail } = useProductDetail();
  const { topics, boards } = useDomainCtx();
  const [boardID, setBoardID] = useState("");
  const [formData, setFormData] = useState({
    id: null as string | null,
    feature_name: "",
    description: "",
    topics: [] as string[],
    slug: "",
    do_not_notify: false,
  });
  const [media, setMedia] = useState<
    {
      id: any;
      media_url: string;
      content_type: "video" | "image";
      localId: any;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useCustomRouter();
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : typeof window !== "undefined" ? window.location.host : "";

  async function handleSubmit() {
    if (!token || !host) return;
    const id = formData?.id ? formData?.id?.toString() : "";
    try {
      setLoading(true);
      const res = await updateSubmissionApi({
        description: formData.description,
        feature_name: formData.feature_name,
        submission_board_id: boardID || "",
        domain: host || "",
        submission_id: id,
        submission_topic_id: formData.topics.join(","),
        do_not_notify: formData.do_not_notify,
        token,
      });

      if (res?.type === ApiResType.SUCCESS) {
        await fetch(`/api/revalidateRoadmapDetail?slug=${formData.slug}`, {
          method: "POST",
        });
        await fetch(`/api/revalidateRoadmaps`, {
          method: "POST",
        });
        router.push(`/roadmap/submissions`);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "something went wrong");
    }
  }

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);

  useEffect(() => {
    if (!token || !post_uid) return;

    async function fetchProductSubmission() {
      try {
        setLoading(true);
        const res = await getSubmissionDetailApi({
          token,
          post_uid,
        });

        if (res?.type === ApiResType.SUCCESS) {
          const topics = res?.data?.submission_topic?.reduce((acc: any, curr: any) => {
            acc.push(curr?.id?.toString());
            return acc;
          }, []);
          setFormData({
            feature_name: res?.data?.feature_name,
            description: res?.data?.description,
            id: res?.data?.id,
            topics: topics,
            slug: res?.data?.slug,
            do_not_notify: res?.data?.do_not_notify || false,
          });
          setMedia(res.data.submission_media.map((i: any) => ({ ...i, localId: v4() })));
          setBoardID(res?.data?.submission_board?.id?.toString());
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error, "something went wrong");
      }
    }

    fetchProductSubmission();
  }, [token, post_uid]);

  const onImagePik = (e: any) => {
    const selectedFiles: any = e.target.files;

    const fileList: any = [];

    if (media.length >= 3 || e.target?.files?.length > 3) {
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
    setMedia((s) => [...s, ...fileList]);
    e.target.value = "";
  };

  return (
    <div>
      <div className="text-foreground/90 text-xl mb-4 capitalize">Update Submission</div>
      <div className="space-y-3">
        <Textarea
          onChange={(e) => setFormData((p) => ({ ...p, feature_name: e.target.value }))}
          label="Title"
          labelPlacement="outside"
          classNames={{
            label: "text-foreground/90",
          }}
          value={formData.feature_name}
          variant="bordered"
          color="primary"
          maxRows={1}
        />
        <Textarea
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          label="Description"
          labelPlacement="outside"
          classNames={{
            label: "text-foreground/90",
          }}
          value={formData.description}
          variant="bordered"
          color="primary"
        />

        {(productDetail?.role === Role.OWNER || user?.role === Role.ADMIN || user?.role === Role.EDITOR) && (
          <Select label="Board" items={boards} placeholder="Select a Board" variant="bordered" selectedKeys={[boardID]} onSelectionChange={(e: any) => setBoardID(e.currentKey)} color="primary">
            {boards?.map((b) => (
              <SelectItem key={b?.id?.toString()} value={b?.id?.toString()} onClick={() => setBoardID(b?.id?.toString())}>
                {b?.name}
              </SelectItem>
            ))}
          </Select>
        )}

        <div>
          <Switcher
            isSelected={formData?.do_not_notify}
            onValueChange={() => {
              setFormData((p) => ({ ...p, do_not_notify: !p.do_not_notify }));
            }}
            desc="Do not notify users about this submission update."
            label="Do not notify"
          />
        </div>

        {topics?.length > 0 && (
          <div className="pt-1">
            <Select
              label="Topics"
              variant="bordered"
              value={formData.topics}
              selectionMode="multiple"
              placeholder="Select topics"
              selectedKeys={formData.topics}
              color="primary"
              onSelectionChange={(e: any) => {
                if (Array.from(e).length > 3) {
                  return toast.error("You can select maximum 3 topics");
                }
                setFormData((p) => ({ ...p, topics: Array.from(e) || [] }));
              }}
              classNames={{
                base: " w-full",
                label: "text-foreground/90",
                trigger: "border-[1px]",
              }}
            >
              {topics.map((t) => {
                return (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                );
              })}
            </Select>
          </div>
        )}
      </div>

      {/* MEDIA  */}
      <div className="media mt-4">
        <h4 className="font-medium mb-2">Media</h4>
        <div className="flex items-center justify-between">
          <label htmlFor="SelectFile">
            <div className="bg-foreground-200 p-3 inline-block rounded-md cursor-pointer group hover:bg-foreground-300 transition-all">
              <BsFillImageFill />
              <input className="hidden" type="file" multiple max={3} id="SelectFile" onChange={onImagePik} />
            </div>
          </label>
        </div>
        <div className="flex">
          {media.length > 0 && (
            <div className="pb-2  flex gap-2 items-start  w-full overflow-auto">
              {media.map((i, ind) => {
                return (
                  <div className="h-[140px] aspect-square" key={i.localId}>
                    <ImageUploader
                      {...i}
                      parentId={post_uid}
                      type="submission_image"
                      onRemove={(id) => {
                        setMedia((s) => s.filter((i2) => !(i2.id === id || i2.localId === id)));
                      }}
                      onUpload={(obj) => {
                        setMedia((s) =>
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
        </div>
      </div>

      <div className="text-center space-x-2 my-5">
        <Button isDisabled={!formData.feature_name || !formData.description} className="capitalize" isLoading={loading} color="primary" onClick={handleSubmit}>
          Update
        </Button>
        <Button as={Link} href={`/roadmap/submissions`}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
