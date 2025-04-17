import { content } from "../../../../(layout)/components/variants";
import { getSubmissionDetailApi } from "../../../../../network/api/product/roadmap";
import { ApiResType } from "../../../../../types/enum";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getProductByDomain } from "../../../../../network/api/product";
import Detail from "./(components)/Detail";

async function getPostDetail({ slug, uid, token }: { slug: string; uid: string; token?: string }) {
  try {
    const res = await getSubmissionDetailApi({
      post_uid: uid,
      ...(token && { token }),
      reval: { tags: [`${slug}`] },
    });

    if (res.type === ApiResType.SUCCESS) {
      return res.data;
    }
  } catch (error) {
    console.log(error, "error");
  }
}

export default async function FeatureDetail({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const token = (await cookies()).get("epic_token")?.value;
  const uid = slug.split("-").pop() || "";
  const detail = await getPostDetail({ slug, uid, token });

  return (
    <div className={content({ class: "pt-10" })}>
      <Detail detail={detail} />
    </div>
  );
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // read route params

  const headersList = await headers();
  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : headersList.get("host");
  const slug = params?.slug;
  const post_uid = slug?.split("-").pop() || slug;

  const res1 = await getProductByDomain({ domain: host || "" });

  const res = await getSubmissionDetailApi({
    post_uid,
  });

  const p = res1?.data;

  let d = res?.data || {
    feature_name: p?.product_detail?.title,
    description: "Personal Dashboard",
  };

  // const bannerUrl = d?.roadmap_media[0]?.media_url || "";
  const bannerUrl = "";

  const title = d?.feature_name + " - " + p?.product_detail?.title;
  const description = d?.description?.split(" ")?.slice(0, 150)?.join(" ") || "";

  return {
    title,
    description: description,
    openGraph: {
      title,
      description: description,
      images: [
        {
          url: bannerUrl,
        },
      ],
      type: "website",
      siteName: host || "EpicXplorer",
      url: host ? `https://${host}/post/${d?.slug}` : "https://epicxplorer.com/",
    },
    twitter: {
      title,
      description: description,
      card: "summary_large_image",
      images: [
        {
          url: bannerUrl,
        },
      ],
    },
  };
}
