import React from "react";
import { headers } from "next/headers";
import { getProductSubmissionApi } from "../../../../../network/api/product/roadmap";
import { content } from "../../../components/variants";
import Content from "./Content";
import { Metadata } from "next";
import { getProductByDomain } from "../../../../../network/api/product";
import { Feature_requests } from "../../../../../utils/helpers";

async function getSubmissions() {
  const headersList = await headers();
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : headersList.get("host"); 

  try {
    const res = await getProductSubmissionApi({
      limit: "10",
      page: "1",
      domain: host || "",
      reval: { tags: ["roadmap"] },
    });
    return res;
  } catch {
    console.error("Failed to fetch product details!");
  }
}

export default async function page() {
  const allSubmissions = await getSubmissions();

  return (
    <div className={content({ class: "py-10" })}>
      {/* TODO: This is our second page of submissions, we need to change the data to be fetched from the API */}
      <Content allSubmissions={Feature_requests.data || allSubmissions} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : headersList.get("host");

  const res1 = await getProductByDomain({ domain: host || "" });
  const p = res1?.data;

  const title = "Submissions - " + p?.product_detail?.title;
  const desc = "Discover, prioritize, and contribute to the evolution of our products by exploring and submitting submissions on our dedicated Submissions page";

  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images: [
        {
          url: "",
        },
      ],
      type: "website",
      siteName: host || "EpicXplorer",
      url: host ? `https://${host}/roadmap/submissions` : "https://epicxplorer.com/",
    },
    twitter: {
      title: title,
      description: desc,
      card: "summary_large_image",
      images: [
        {
          url: "",
        },
      ],
    },
  };
}
