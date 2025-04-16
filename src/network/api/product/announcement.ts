import { post } from "../../index";

export async function getAllAnnouncementApi({ token, reval, ...raw }: { token?: string; limit: string; page: string; product_id?: string; slug?: string; domain?: string; reval?: any }) {
  return post({
    route: "/api/v1/getAllAnnouncement",
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

export async function createAnnouncementApi({
  token,
  ...raw
}: {
  token: string;
  product_id?: string;
  domain?: string;
  title: string;
  content: string;
  expiration_date?: string;
  is_active: boolean;
  category: string;
  announcement_media_id?: string;
}) {
  return post({
    route: "/api/v1/createAnnouncement",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}
export async function updateAnnouncementApi({
  token,
  ...raw
}: {
  token: string;
  product_id?: string;
  domain?: string;
  title: string;
  content: string;
  expiration_date?: string;
  is_active: boolean;
  category: string;
  announcement_id: string;
}) {
  return post({
    route: "/api/v1/updateAnnouncement",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addAnnoucementMediaApi({ token, ...raw }: { token: string; media_url: string; type: string; content_type: string }) {
  return post({
    route: "/api/v1/addAnnouncementMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}
export async function updateAnnoucementMediaApi({ token, ...raw }: { token: string; announcement_media_id: string; media_url: string; type: string; content_type: string; product_id: string; announcement_id: string }) {
  return post({
    route: "/api/v1/updateAnnouncementMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeAnnoucementMediaApi({ token, ...raw }: { token: string; announcement_media_id: string; product_id: string; announcement_id: string }) {
  return post({
    route: "/api/v1/removeAnnouncementMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeAnnouncementApi({ token, ...raw }: { token: string; announcement_id: string; product_id?: string; domain?: string }) {
  return post({
    route: "/api/v1/removeAnnouncement",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getAnnouncementApi({ token, announcement_id }: { token: string; announcement_id: string }) {
  return post({
    route: "/api/v1/getAnnouncement",
    data: JSON.stringify({ announcement_id }),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}
