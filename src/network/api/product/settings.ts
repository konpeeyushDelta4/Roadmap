import { post } from "../../index";
import { SubmissionStatusE, Role } from "../../../types/enum";
import { MailConfigT } from "../../../types/product";

// export async function addProductSubmissionTopicApi({
//     token,
//     ...raw
// }: {
//     domain?: string;
//     token: string;
//     name: string;
//     product_id?: string;
// }) {
//     return post({
//         route: "/api/v1/addProductSubmissionTopic",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function removeProductSubmissionTopicApi({
//     token,
//     ...raw
// }: {
//     domain?: string;
//     token: string;
//     topic_id: string;
//     product_id?: string;
// }) {
//     return post({
//         route: "/api/v1/removeProductSubmissionTopic",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function editProductSubmissionTopicApi({
//     token,
//     ...raw
// }: {
//     domain?: string;
//     token: string;
//     name: string;
//     topic_id: string;
//     product_id?: string;
// }) {
//     return post({
//         route: "/api/v1/editProductSubmissionTopic",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

export async function getProductSubmissionTopicApi({
    token,
    ...raw
}: {
    domain?: string;
    token: string;
    limit?: string;
    page?: string;
    search?: string;
    product_id?: string;
}) {
    return post({
        route: "/api/v1/getProductSubmissionTopic",
        data: JSON.stringify(raw),
        config: {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "application/json",
            },
        },
    });
}

// export async function assignTopicToSubmissionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     topic_id: string;
//     submission_id: string;
// }) {
//     return post({
//         route: "/api/v1/assignTopicToSubmission",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function removeAssignTopicFromSubmissionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     topic_id: string;
//     submission_id: string;
// }) {
//     return post({
//         route: "/api/v1/removeAssignTopicFromSubmission",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function getAllMemberApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     limit?: string;
//     page?: string;
//     orderBy?: string;
//     product_id?: string;
//     slug?: string;
// }) {
//     return post({
//         route: "/api/v1/getAllMember",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function addMemberApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     user_id: string;
//     role: Role;
//     product_id?: string;
//     slug?: string;
// }) {
//     return post({
//         route: "/api/v1/addMember",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function updateMemberApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     member_id: string;
//     role: Role;
//     product_id?: string;
//     slug?: string;
// }) {
//     return post({
//         route: "/api/v1/updateMember",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function removeMemberApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     member_id: string;
//     product_id?: string;
//     slug?: string;
// }) {
//     return post({
//         route: "/api/v1/removeMember",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function enableSSOApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     enable?: string;
// }) {
//     return post({
//         route: "/api/v1/enableSSO",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function updateSSOSettingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     redirect_url?: string;
//     button_label?: string;
// }) {
//     return post({
//         route: "/api/v1/updateSSOSetting",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function getProductDashboardSettingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
// }) {
//     return post({
//         route: "/api/v1/getProductDashboardSetting",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }


// export async function updateProductDashboardSettingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     enable_detail?: string,
//     enable_submissions?: string,
//     enable_announcements?: string,
//     enable_changelogs?: string
// }) {
//     return post({
//         route: "/api/v1/updateProductDashboardSetting",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function createProductSettingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     webhook_url?: string;
//     mail_config?: MailConfigT;
//     subscribed_events?: string;
// }) {
//     return post({
//         route: "/api/v1/createProductSetting",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function updateProductSettingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     webhook_url?: string;
//     mail_config?: MailConfigT;
//     subscribed_events?: string;
// }) {
//     return post({
//         route: "/api/v1/updateProductSetting",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function getAllSubmissionBoardApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     product_id: string;
//     limit: string;
//     page: string;
// }) {
//     return post({
//         route: "/api/v1/getAllSubmissionBoard",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json"
//             }
//         }
//     });
// }

// export async function createSubmissionBoardApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     product_id: string;
//     name: string;
//     status: SubmissionStatusE;
//     color: string;
// }) {
//     return post({
//         route: "/api/v1/createSubmissionBoard",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json"
//             }
//         }
//     });
// }

// export async function updateSubmissionBoardApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     board_id: string;
//     name?: string;
//     status?: SubmissionStatusE;
//     color?: string;
//     show_in_dashboard?: "0" | "1";
// }) {
//     return post({
//         route: "/api/v1/updateSubmissionBoard",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json"
//             }
//         }
//     });
// }

// export async function removeSubmissionBoardApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     board_id: string;
// }) {
//     return post({
//         route: "/api/v1/removeSubmissionBoard",
//         data: JSON.stringify(raw),
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json"
//             }
//         }
//     });
// }