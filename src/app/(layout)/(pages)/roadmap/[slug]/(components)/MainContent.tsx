import React from "react";

export default function MainContent() {
  return <div></div>;
}

// import Comments from "app/[locale]/domain/components/Comments";
// import { ArrowLeft, ChevronLeft } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { SubmissionDetailT, topicT } from "types/product";
// import Aside from "./Aside";
// import { Chip } from "@heroui/react";

// export default function MainContent({ user_vote_status, upvote_count, user, status, id, feature_name, description, createdAt, roadmap_topic, roadmap_media }: SubmissionDetailT) {
//   const topics =
//     roadmap_topic?.reduce((acc: string[], crr: topicT) => {
//       acc.push("#" + crr?.name);
//       return acc;
//     }, []) || [];
//   return (
//     <div className="p-5 flex-1">
//       <div>
//         <Link href={"/roadmap/feature-requests"} className="flex gap-1 items-center text-foreground/50 text-sm hover:text-foreground/90 transition-all w-fit">
//           <ChevronLeft />
//           Back to all Features
//         </Link>
//         <h1 className="text-xl font-semibold my-3">{feature_name}</h1>
//         <p className="text-foreground/50">{description}</p>

//         <div className="media mt-6 flex gap-2">
//           {roadmap_media?.map((i) => {
//             const boxClass = "rounded-medium overflow-hidden h-[120px] aspect-video bg-black relative";

//             if (i.content_type === "image") {
//               return (
//                 <a href={i.media_url} key={i.id} className={[boxClass, "inline-block"].join(" ")} target="_blank">
//                   <img src={i.media_url} className="h-full w-full hover:scale-105 transition-all object-cover" alt={feature_name} />
//                 </a>
//               );
//             } else if (i.content_type === "video") {
//               return (
//                 <a href={i.media_url} target="_blank" className={[boxClass, "inline-block"].join(" ")} key={i.id}>
//                   <video src={i.media_url} className="hover:scale-105 transition-all h-full w-full object-cover" autoPlay muted></video>
//                 </a>
//               );
//             } else {
//               return null;
//             }
//           })}
//         </div>

//         {topics?.length > 0 && (
//           <div className="mt-3 space-x-1">
//             {topics?.map((t, indx) => {
//               return (
//                 <Chip key={indx} className="text-sm" variant="flat" color="primary">
//                   {t}
//                 </Chip>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       <div className="md:hidden">
//         <Aside submissionID={id?.toString()} upVoted={user_vote_status} createdAt={createdAt} upvote_count={upvote_count} user={user} status={status} />
//       </div>

//       <Comments submissionID={id?.toString()} />
//       {/* {dModal && (
//         <ConfirmModal
//           isOpen={dModal}
//           onClose={() => setDModal(false)}
//           onConfirm={deleteRoadmap}
//           title="Do you want to delete this roadmap?"2
//           loading={dloading}
//         />
//       )} */}
//     </div>
//   );
// }
