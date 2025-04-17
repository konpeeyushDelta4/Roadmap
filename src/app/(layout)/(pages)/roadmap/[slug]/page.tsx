import React from "react";

export default function page() {
  return <div></div>;
}

// "use client";
// import { content } from "app/[locale]/domain/components/variants";
// import { getSubmissionDetailApi } from "network/api/product/roadmap";
// import { useCallback, useEffect, useState } from "react";
// import { ApiResType } from "types/enum";
// import { SubmissionDetailT } from "types/product";
// import MainContent from "./(components)/MainContent";
// import Aside from "./(components)/Aside";
// import { Divider } from "@heroui/react";
// import { useAuth } from "context/AuthContext";

// export default function FeatureDetail({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const [detail, setDetail] = useState({} as SubmissionDetailT);
//   const slug = params?.slug;
//   const { token } = useAuth();

//   const loadFeatureDetail = useCallback(async () => {
//     if (!slug) return;
//     try {
//       const res = await getSubmissionDetailApi({
//         slug,
//         token,
//       });

//       if (res.type === ApiResType.SUCCESS) {
//         setDetail(res.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }, [slug, token]);

//   useEffect(() => {
//     loadFeatureDetail();
//   }, [loadFeatureDetail]);

//   return (
//     <div className={content({ class: "pt-10" })}>
//       <div className="relative">
//         <div className="bg-content1 rounded-lg border border-content2/80 pb-48 flex">
//           <MainContent {...detail} />
//           <div className="py-1 hidden md:block">
//             <Divider orientation="vertical" className="border-content2/80" />
//           </div>
//           <div className="hidden md:block">
//             <Aside
//               submissionID={detail?.id?.toString()}
//               createdAt={detail?.createdAt}
//               upvote_count={detail?.upvote_count}
//               user={detail?.user}
//               upVoted={detail?.user_vote_status}
//               status={detail?.status}
//             />
//           </div>
//         </div>
//         <div
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(228,64,219,0) 0%, rgba(0,0,0,1) 83%)",
//           }}
//           className="absolute bottom-0 left-0 w-full h-[240px]"
//         />
//       </div>
//     </div>
//   );
// }
