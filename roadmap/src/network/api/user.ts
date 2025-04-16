import { post } from "../index";

export async function getUserDetailApi({ token }: { token?: string }) {
  return post({
    route: "/api/v1/getUserDetail",
    data: JSON.stringify({}),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function updateUserDetailApi({ token, ...raw }: {
  token: string,
  first_name?: string,
  last_name?: string,
  username?: string,
  name?: string,
  phone_no?: string,
  country?: string
}) {
  return post({
    route: "/api/v1/updateUserDetail",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addProfilePicApi({ token, profile_pic }: { token: string, profile_pic: string }) {
  return post({
    route: "/api/v1/addProfilePic",
    data: JSON.stringify({ profile_pic }),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  })
}

export async function removeProfilePic({ token }: { token: string }) {
  return post({
    route: "/api/v1/removeProfilePic",
    data: JSON.stringify({}),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  })
}
