import { post } from "../../index";
import { SubmissionStatusE } from "../../../types/enum";
import { MediaContentType, MediaType } from "../../../types/media";

export async function addSubmissionApi({ token, ...raw }: { token: string; product_id?: string; domain?: string; submission_topic_id?: string; feature_name: string; description: string; status?: string; submission_media_id?: string, submission_board_id?: string }) {
  return post({
    route: "/api/v1/addSubmission",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeSubmissionApi({ token, ...raw }: { domain?: string; token: string; submission_id: string; product_id?: string }) {
  return post({
    route: "/api/v1/removeSubmission",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function updateSubmissionApi({
  token,
  ...raw
}: {
  token: string;
  product_id?: string;
  domain?: string;
  submission_topic_id?: string;
  feature_name?: string;
  description?: string;
  status?: string;
  submission_media_id?: string;
  submission_id?: string;
  post_uid?: string;
  submission_board_id?: string;
  updateRoadmap?: boolean;
  do_not_notify?: boolean;
}) {
  return post({
    route: "/api/v1/updateSubmission",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addSubmissionMediaApi({ token, ...raw }: { token: string; media_url: string; type: MediaType; content_type: MediaContentType }) {
  return post({
    route: "/api/v1/addSubmissionMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function updateSubmissionMediaApi({ token, ...raw }: { token: string; submission_media_id: string; media_url: string; type: string; content_type: string; product_id: string; submission_id: string }) {
  return post({
    route: "/api/v1/updateSubmissonMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeSubmissionMediaApi({ token, ...raw }: { token: string; submission_media_id: string; product_id: string; submission_id: string; }) {
  return post({
    route: "/api/v1/removeSubmissionMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getProductSubmissionApi({ token, reval, ...raw }: {
  token?: string; product_id?: string; page?: string; limit?: string; search?: string; domain?: string; status?: SubmissionStatusE; slug?: string; reval?: any; topic_id?: string,
  submission_board_id?: string;
  board_slug?: string;
}) {
  return post({
    route: "/api/v1/getProductSubmission",
    data: JSON.stringify(raw),
    reval,
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function getSubmissionDetailApi({ token, ...raw }: { token?: string; submission_id?: string; slug?: string; reval?: any; post_uid?: string }) {
  return post({
    route: "/api/v1/getSubmissionDetail",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

// export async function changeSubmissionStatusApi({ token, ...raw }: { token: string; submission_id: string; status: string }) {
//   return post({
//     route: "/api/v1/changeSubmissionStatus",
//     data: JSON.stringify(raw),
//     config: {
//       headers: {
//         Authorization: "Bearer " + token,
//         "content-type": "application/json",
//       },
//     },
//   });
// }

export async function addSubmissionUpvoteApi({ token, ...raw }: { token: string; submission_id: string; status: string }) {
  return post({
    route: "/api/v1/addSubmissionUpvote",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addSubmissionCommentApi({ token, ...raw }: { token?: string; submission_id: string; comment: string; mention_ids?: string, parent_comment_id?: string; comment_media_id: string; submission_url?: string }) {
  return post({
    route: "/api/v1/addSubmissionComment",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getSubmissionCommentApi({ token, ...raw }: { token?: string; submission_id: string }) {
  return post({
    route: "/api/v1/getSubmissionComment",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeSubmissionCommentApi({ token, ...raw }: { token: string; comment_id: string; parent_comment_id?: string; product_id: string; submission_id: string }) {
  return post({
    route: "/api/v1/removeSubmissionComment",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function editSubmissionCommentApi({ token, ...raw }: { token: string; comment_id: string; comment: string; product_id: string; submission_id: string, comment_media_id?: string }) {
  return post({
    route: "/api/v1/editSubmissionComment",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function likeSubmissionCommentApi({ token, ...raw }: { token: string; comment_id: string; status: string }) {
  return post({
    route: "/api/v1/likeSubmissionComment",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addSubmissionCommentMediaApi({ token, ...raw }: { token: string; media_url: string; type: MediaType; content_type: MediaContentType }) {
  return post({
    route: "/api/v1/addSubmissionCommentMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeSubmissionCommentMediaApi({ token, ...raw }: { token: string; comment_id: string; comment_media_id: string, product_id: string, submission_id: string }) {
  return post({
    route: "/api/v1/removeSubmissionCommentMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function updateSubmissionCommentMediaApi({
  token,
  ...raw
}: {
  token: string;
  comment_id: string;
  comment_media_id: string;
  submission_id: string;
  product_id: string;
}) {
  return post({
    route: "/api/v1/updateSubmissionCommentMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}



export async function getSubmissionParticipantApi({ token, submission_id }: { token: string, submission_id: string }) {
  return post({
    route: "/api/v1/getParticipant",
    data: JSON.stringify({ submission_id }),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",

      },
    },
  });
}