"use client";
import { Button, Select, SelectItem, Textarea } from "@heroui/react";
import { useAuth } from "../../../../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { addSubmissionApi } from "../../../../../network/api/product/roadmap";
import { ApiResType, Role } from "../../../../../types/enum";
import { useProductDetail } from "../../../context/ProductProvider";
import { toast } from "react-toastify";
import { BsFillImageFill } from "react-icons/bs";
import { useDomainCtx } from "../../../context/DomainCtxProvider";
import ImageUploader from "../../../../(components)/ImageUploader";

export default function CreateReq({ onCreate, onTitleChange, onFocus, tsearch }: { onTitleChange: (value: string) => void; onCreate: (fr: any) => void; onFocus: () => void; tsearch?: string }) {
  const { token, user, setLoginOpen } = useAuth();
  const { productDetail } = useProductDetail();
  const [formData, setFormData] = useState({
    feature_name: tsearch,
    description: "",
    topics: [] as string[],
  });

  const [images, setImages] = useState<
    {
      localId: any;
      id: any;
      file: any;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  // const [boardID, setBoardID] = useState("");
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : typeof window !== "undefined" ? window.location.host : "";

  const { topics } = useDomainCtx();

  useEffect(() => {
    setFormData((p) => ({ ...p, feature_name: tsearch }));
  }, [tsearch]);


  async function handleSubmit() {
    if (!token || !host || !formData.feature_name || !formData.description) return;
    try {
      setLoading(true);      
      const res = await addSubmissionApi({
        description: formData.description,
        feature_name: formData.feature_name,
        domain: host || "",
        submission_topic_id: formData.topics.join(","),
        token,
        ...(images.length > 0 && {
          submission_media_id: images.map((i) => i.id).join(","),
        }),
      });
      setLoading(false);

      if (res?.type === ApiResType.SUCCESS) {
        onCreate(res?.data);
        setFormData({
          feature_name: "",
          description: "",
          topics: [],
        });

        await fetch(`/api/revalidateDetail?slug=${productDetail?.slug}`, {
          method: "POST",
        });
        await fetch(`/api/revalidateRoadmaps`, {
          method: "POST",
        });

        setImages([]);
      }
    } catch (err) {
      setLoading(false);
      console.log(err, "something went wrong");
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
  return (
    <div className="md:sticky top-[120px] w-full md:basis-[30%] shrink-0 bg-content1/60 rounded-lg border border-foreground/5 p-3">
      <div className="text-foreground/90 text-lg font-medium mb-4 capitalize">Create Submission</div>
      <div className="space-y-4">
        <Textarea
          onChange={(e) => {
            setFormData((p) => ({ ...p, feature_name: e.target.value }));
            onTitleChange(e.target.value);
          }}
          onFocus={onFocus}
          label="Title"
          labelPlacement="outside"
          classNames={{
            label: "text-foreground/90 text-sm",
            inputWrapper: "border-[1px]",
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
            label: "text-foreground/90 text-sm",
            inputWrapper: "border-[1px]",
          }}
          value={formData.description}
          variant="bordered"
          color="primary"
        />

        {/* IMAGE UPLOADER  */}
        {images.length > 0 && (
          <div className="pb-2  flex gap-2 items-start  w-full overflow-auto">
            {images.map((i, ind) => {
              return (
                <div className="h-[140px] aspect-square" key={i.localId}>
                  <ImageUploader
                    {...i}
                    type="submission_image"
                    onRemove={(id) => {
                      console.log(id);
                      setImages((s) => s.filter((i2) => !(i2.id === id || i2.localId === id)));
                    }}
                    onUpload={(obj) => {
                      console.log(obj);
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

        <div className="flex items-center justify-between">
          <label htmlFor="SelectFile">
            <div className="bg-foreground-200 p-3 inline-block rounded-md cursor-pointer group hover:bg-foreground-300 transition-all">
              <BsFillImageFill/>
              <input className="hidden" type="file" multiple max={3} id="SelectFile" onChange={onImagePik} />
            </div>
          </label>
        </div>
        {/* {(productDetail?.role === Role.OWNER ||
          user?.role === Role.ADMIN ||
          user?.role === Role.EDITOR) && (
          <Select
            label="Board"
            items={boards}
            placeholder="Select a Board"
            variant="bordered"
            onSelectionChange={(e: any) => setBoardID(e.currentKey)}
            color="primary"
          >
            {boards?.map((b) => (
              <SelectItem
                key={b?.id}
                value={b?.id}
                onClick={() => setBoardID(b?.id?.toString())}
              >
                <div>
                  {b?.name}
                  {b?.id?.toString()}
                </div>
              </SelectItem>
            ))}
          </Select>
        )} */}

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
            >
              {topics.map((t) => {
                return (
                  <SelectItem key={t.id}>
                    {t.name}
                  </SelectItem>
                );
              })}
            </Select>
          </div>
        )}
      </div>
      <div className="mt-3">
        {token ? (
          <Button isDisabled={!formData.feature_name || !formData.description} className="capitalize" isLoading={loading} color="primary" onPress={handleSubmit}>
            Create
          </Button>
        ) : (
          <Button onPress={() => setLoginOpen(true)} color="primary">
            Login to create
          </Button>
        )}
      </div>
    </div>
  );
}
