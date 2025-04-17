import { headers } from "next/headers";
import { content } from "../../components/variants";
import { getProductSubmissionApi } from "../../../../network/api/product/roadmap";
import { ApiResType } from "../../../../types/enum";
import Lists from "./Lists";
import Content from "./Content";

export const revalidate = 10;

async function getSubmissions() {
  try {
    const headersList = headers();
    const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
      ? process.env.NEXT_PUBLIC_DOMAIN
      : (await headersList).get("host");

    const res = await getProductSubmissionApi({
      reval: { tags: ["roadmap"] },
      domain: host || "",
      limit: "50",
      page: "1",
    });

    if (res.type === ApiResType.SUCCESS) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (err) {
    console.log("Something went wrong");
  }
}

export default async function RoadmapPage() {
  const allSubmissions = await getSubmissions();

  return (
    <div className={content()}>
      <Content />
      <div className="h-full">
        <Lists allSubmissions={allSubmissions} />
      </div>
    </div>
  );
}
