import React from "react";

export default function Aside() {
  return <></>;
}

// "use client";
// import { Button, Chip, Divider } from "@nextui-org/react";
// import Avatar from "app/components/Avatar";
// import { useAuth } from "context/AuthContext";
// import { format } from "date-fns";
// import { ChevronUp } from "lucide-react";
// import { addRoadmapUpvoteApi } from "network/api/product/roadmap";
// import React, { useEffect, useState } from "react";
// import { tv } from "tailwind-variants";
// import { RoadmapStatusE } from "types/enum";
// import { SubmissionDetailT } from "types/product";

// export default function Aside({
//   createdAt,
//   upvote_count,
//   user,
//   upVoted,
//   status,
//   submissionID,
// }: {
//   submissionID: string;
//   createdAt: string;
//   upvote_count: string;
//   user: SubmissionDetailT["user"];
//   status: SubmissionDetailT["status"];
//   upVoted: string;
// }) {
//   const { token, setLoginOpen } = useAuth();
//   const [voteCount, setVoteCount] = useState(Number(upvote_count) || 0);
//   const [isVoted, setIsVoted] = useState(Boolean(Number(upVoted)) || false);

//   async function voteUp() {
//     if (!token) {
//       setLoginOpen(true);
//       return;
//     }
//     if (!submissionID) return;
//     try {
//       setIsVoted(!isVoted);
//       setVoteCount(isVoted ? voteCount - 1 : voteCount + 1);
//       await addRoadmapUpvoteApi({
//         token,
//         roadmap_id: submissionID,
//         status: isVoted ? "0" : "1",
//       });
//     } catch (error) {
//       console.log(error, "something went wrong");
//     }
//   }

//   function getChipVariant() {
//     switch (status) {
//       case RoadmapStatusE.INREVIEW:
//         return "primary";
//       case RoadmapStatusE.INPROGRESS:
//         return "warning";
//       case RoadmapStatusE.PLANNED:
//         return "secondary";
//       case RoadmapStatusE.COMPLETE:
//         return "success";
//       default:
//         return "default";
//     }
//   }

//   useEffect(() => {
//     setIsVoted(Boolean(Number(upVoted)) || false);
//     setVoteCount(Number(upvote_count) || 0);
//   }, [upVoted, upvote_count]);

//   function formateDate(date: string) {
//     if (!date) return;
//     const parsedDate = new Date(date);
//     return format(parsedDate, "dd MMM, yyyy");
//   }

//   return (
//     <div className="py-5 md:px-5 basis-[30%]">
//       <div className={itemS}>
//         <div className={labelS}>Upvotes</div>
//         <div className={valueS}>
//           <div
//             onClick={voteUp}
//             className={voteUpBtnV({ state: isVoted ? "voted" : "notVoted" })}
//           >
//             <ChevronUp width={20} />
//             {voteCount}
//           </div>
//         </div>
//       </div>
//       <div className={itemS}>
//         <div className={labelS}>Status</div>
//         <div className={valueS}>
//           <Chip
//             size="md"
//             radius="sm"
//             classNames={{
//               content: "capitalize text-[13px] font-medium",
//             }}
//             // className=" text-[15px]"
//             color={getChipVariant()}
//             variant="flat"
//           >
//             {status?.replaceAll("_", " ")}
//           </Chip>
//         </div>
//       </div>
//       {/* <div className={itemS}>
//         <div className={labelS}>Status</div>
//         <div className={valueS}>{status}</div>
//       </div> */}
//       <Divider className="mb-3" />
//       <div className={itemS}>
//         <div className={labelS}>Created by</div>
//         <div className={valueS}>
//           {user?.profile_pic && (
//             <Avatar
//               classNames="mb-1"
//               image={user?.profile_pic || ""}
//               name={user?.name || ""}
//             />
//           )}
//           {user?.name}
//         </div>
//       </div>
//       <div className={itemS}>
//         <div className={labelS}>Posted on</div>
//         <div className={valueS}>{formateDate(createdAt)}</div>
//       </div>
//     </div>
//   );
// }

// const itemS = "flex gap-4 mb-3";
// const labelS =
//   "text-foreground/50 min-w-[40%] w-[120px] font-medium text-[15px]";
// const valueS = "text-foreground/90 font-medium text-sm";

// const voteUpBtnV = tv({
//   base: "flex gap-1 items-center px-2 py-1 rounded-md border transition-all cursor-pointer",
//   variants: {
//     state: {
//       voted: "bg-primary/20 text-primary/90 border-primary ",
//       notVoted:
//         "bg-content2/60 text-foreground/50 hover:text-foreground/80 border-content3 hover:bg-content2",
//     },
//   },
// });
