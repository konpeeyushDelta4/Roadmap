import { post } from "../index";
import { SubscriptionE } from "../../types/enum";

// export async function getSubscriptionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
// }) {
//     return post({
//         data: JSON.stringify(raw),
//         route: "/api/v1/getSubscription",
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function createSubscriptionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     plan: SubscriptionE;
//     type: React.Key;
//     successUrl: string;
//     cancelUrl: string;
// }) {
//     return post({
//         data: JSON.stringify(raw),
//         route: "/api/v1/createSubscription",
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function cancelSubscriptionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     subscription_id: string;
// }) {
//     return post({
//         data: JSON.stringify(raw),
//         route: "/api/v1/cancelSubscription",
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function updateSubscriptionApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     plan: SubscriptionE;
//     type: React.Key;
// }) {
//     return post({
//         data: JSON.stringify(raw),
//         route: "/api/v1/updateSubscription",
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }

// export async function manageBillingApi({
//     token,
//     ...raw
// }: {
//     token: string;
//     domain?: string;
//     product_id?: string;
//     return_url: string;
// }) {
//     return post({
//         data: JSON.stringify(raw),
//         route: "/api/v1/manageBilling",
//         config: {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "content-type": "application/json",
//             },
//         },
//     });
// }
