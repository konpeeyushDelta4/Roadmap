"use client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getSignedUrlApi } from "../network/api/product";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiResType, SignedUrlTypeD } from "../types/enum";

export default function useUploadImage() {
  const { token } = useAuth();
  const [progresses, setProgresses] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadImages = async (files: any) => {
    if (!token || files.length < 1) return;

    try {
      setIsUploading(true);

      const uploadPromises = files.map(async (file: any) => {
        const formData = new FormData();
        formData.append("images", file);

        const res = await getSignedUrlApi({
          token,
          file_name: file?.name,
          type: SignedUrlTypeD.LOGO,
        });

        if (res?.type === ApiResType.SUCCESS) {
          return axios.put(res?.data?.url, formData, {
            headers: {
              "Content-Type": file.type,
            },
            onUploadProgress: (progressEvent: any) => {
              const calculatedProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgresses((pp: any) => [...pp, calculatedProgress]);
            },
          });
        }
      });

      const responses = await Promise.all(uploadPromises);
      const uploadedUrls = responses.map((response) => response?.data?.url);

      setUploadedImages(uploadedUrls);
      setIsUploading(false);
      setProgresses([]);
    } catch (error) {
      toast.error("something went wrong while uploading the logo");
      console.error("Error isuploading images:", error);
      setIsUploading(false);
      setProgresses([]);
    }
  };

  return {
    progresses,
    isUploading,
    uploadedImages,
    uploadImages,
  };
}
