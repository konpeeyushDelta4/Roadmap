import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, CircularProgress } from "@nextui-org/react";
import { useProductDetail } from "../(layout)/context/ProductProvider";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getSignedUrlApi } from "../../network/api/product";
import { addAnnoucementMediaApi, removeAnnoucementMediaApi, updateAnnoucementMediaApi } from "../../network/api/product/announcement";
import { addSubmissionCommentMediaApi, addSubmissionMediaApi, removeSubmissionCommentMediaApi, removeSubmissionMediaApi, updateSubmissionApi, updateSubmissionCommentMediaApi, updateSubmissionMediaApi } from "../../network/api/product/roadmap";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { ApiResType } from "../../types/enum";
import { MediaContentType, MediaType } from "../../types/media";

let CONTROLLER: any;

export default function ImageUploader({
  file,
  id,
  type,
  localId,
  onUpload,
  onRemove,
  content_type,
  media_url,
  parentId,
  submissionID,
}: {
  type: MediaType;
  file?: any;
  onUpload: ({ id }: { id: any }) => any;
  onRemove: (id: any) => any;
  localId?: any;
  id?: any;
  content_type?: MediaContentType;
  media_url?: string;
  parentId?: any;
  submissionID?: any;
}) {
  const [localUrl, setLocalUrl] = useState("");
  const { token } = useAuth();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { productDetail } = useProductDetail();

  useEffect(() => {
    const startUpload = async () => {
      try {
        setUploading(true);
        const res = await getSignedUrlApi({
          file_name: file.name,
          token,
          type: type,
        });

        CONTROLLER = new AbortController();
        const config = {
          signal: CONTROLLER.signal,
          onUploadProgress: (progressEvent: any) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
          headers: {
            "Content-Type": file.type,
          },
        };
        await axios.put(res.data.url, file, config);

        let res2;
        let actualType = type;
        const contentType = file.type.split("/")[0] as MediaContentType;

        if (type === "announcement_image") {
          actualType = contentType == "video" ? "announcement_video" : actualType;
          res2 = await addAnnoucementMediaApi({
            media_url: res.data.path,
            token,
            content_type: contentType,
            type: actualType,
          });

          if (parentId) {
            await updateAnnoucementMediaApi({
              content_type: contentType,
              media_url: res.data.path,
              type: actualType,
              announcement_id: parentId,
              announcement_media_id: res2?.data?.id?.toString(),
              product_id: productDetail.id.toString(),
              token,
            });
          }
        } else if (type === "submission_image") {
          actualType = contentType == "video" ? "submission_video" : actualType;

          res2 = await addSubmissionMediaApi({
            media_url: res.data.path,
            token,
            content_type: contentType,
            type: actualType,
          });
          if (parentId) {
            await updateSubmissionMediaApi({
              content_type: contentType,
              media_url: res.data.path,
              type: actualType,
              submission_id: parentId,
              submission_media_id: res2?.data?.id?.toString(),
              product_id: productDetail.id.toString(),
              token,
            });
          }
        } else {
          actualType = contentType == "video" ? "submission_comment_video" : actualType;
          res2 = await addSubmissionCommentMediaApi({
            media_url: res?.data?.path,
            content_type: contentType,
            type: actualType,
            token,
          });

          if (parentId) {
            await updateSubmissionCommentMediaApi({
              comment_id: parentId?.toString(),
              comment_media_id: res2?.data?.id?.toString(),
              product_id: productDetail.id.toString(),
              submission_id: submissionID.toString(),
              token,
            });
          }
        }
        setUploading(false);
        onUpload({ id: res2?.data?.id?.toString() });
      } catch (err) {
        setUploading(false);
        console.log("Err", err);
      }
    };

    if (file) {
      setLocalUrl(URL.createObjectURL(file));
      startUpload();
    }
  }, [file, token]);

  const [removing, setRemoving] = useState(false);
  const onCancel = async () => {
    if (!parentId) {
      onRemove(localId || id);
      return;
    }

    try {
      CONTROLLER?.abort();

      let res: any;

      setRemoving(true);
      switch (type) {
        case "submission_image":
          res = await removeSubmissionMediaApi({
            submission_id: parentId.toString(),
            submission_media_id: id.toString(),
            product_id: productDetail.id.toString(),
            token,
          });
          break;
        case "announcement_image":
          res = await removeAnnoucementMediaApi({
            announcement_id: parentId.toString(),
            announcement_media_id: id.toString(),
            product_id: productDetail.id.toString(),
            token,
          });
          break;
        case "submission_comment_image":
          res = await removeSubmissionCommentMediaApi({
            product_id: productDetail.id.toString(),
            comment_media_id: id.toString(),
            comment_id: parentId.toString(),
            submission_id: submissionID.toString(),
            token,
          });
          break;
        default:
          break;
      }

      setRemoving(true);

      if (res.type === ApiResType.ERROR) {
        toast.error(res.message);
      } else {
        onRemove(localId || id);
      }
    } catch (err) {
      console.log("ERR", err);
    }
  };

  const contentType = content_type || (file?.type.split("/")[0] as MediaContentType);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-300 flex justify-center items-center bg-black">
      <a href={localUrl || media_url} target="_blank" className="self-stretch flex-1">
        {contentType === "video" ? <video src={localUrl || media_url} autoPlay muted className="h-full w-full object-cover" /> : <img className="h-full w-full object-contain" src={localUrl || media_url} onClick={() => {}} />}
      </a>

      {uploading && (
        <>
          <div className="absolute z-[1] left-0 top-0 bg-black/70 h-full w-full"></div>

          <div className="absolute z-[2]">
            <CircularProgress aria-label="Loading..." size="md" className="text-white" value={progress} color="primary" showValueLabel={true} />
          </div>
        </>
      )}
      <div className="absolute top-1 right-1 z-[3]">
        <Button
          isIconOnly
          size="sm"
          disableRipple
          color="danger"
          onPress={() => {
            onCancel();
          }}
          isLoading={removing}
        >
          {parentId ? <TrashIcon height={18} /> : <IoIosClose size={18} />}
        </Button>
      </div>
    </div>
  );
}
