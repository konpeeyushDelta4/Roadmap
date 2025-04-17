import { post } from "../../index";

export async function getAllCategoryApi(p?: { token?: string; search?: string }) {
  const { token, ...raw } = p || {};
  return post({
    route: "/api/v1/getAllCategory",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}
// export async function adminAddCategoryApi({ token, ...raw }: { token?: string; category_name: string }) {
//   return post({
//     route: "/admin/api/v1/addCategory",
//     data: JSON.stringify(raw),
//     config: {
//       headers: {
//         ...(token ? { Authorization: "Bearer " + token } : {}),
//         "content-type": "application/json",
//       },
//     },
//   });
// }
// export async function adminDeleteCategoryApi({ token, ...raw }: { token?: string; category_id: string }) {
//   return post({
//     route: "/admin/api/v1/removeCategory",
//     data: JSON.stringify(raw),
//     config: {
//       headers: {
//         ...(token ? { Authorization: "Bearer " + token } : {}),
//         "content-type": "application/json",
//       },
//     },
//   });
// }

// export async function adminEditCategoryApi({ token, ...raw }: { token?: string; category_id: string; name: string }) {
//   return post({
//     route: "/admin/api/v1/updateCategory",
//     data: JSON.stringify(raw),
//     config: {
//       headers: {
//         ...(token ? { Authorization: "Bearer " + token } : {}),
//         "content-type": "application/json",
//       },
//     },
//   });
// }
