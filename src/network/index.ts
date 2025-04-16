import { log, logErr } from "../utils/helpers";

export const ENDPOINT = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ;

export async function post({ route, data, config, reval, cache = "force-cache" }: {
  route: string; data: any; config?: { headers: any }; reval?: any;
  cache?: "force-cache" | "no-cache" | "reload" | "only-if-cached" | "default" | undefined
}) {
  return fetch(ENDPOINT + route, {
    method: "POST", // or 'PUT'
    headers: {
      ...config?.headers,
    },
    body: data,
    cache,
    ...(reval ? { next: reval } : {}),
  })
    .then(async (response) => {  

      if (!response.ok) {
        const text = await response.text(); // Safely get whatever it returned
        throw new Error(`Server error: ${response.status} - ${text}`);
      }
    
      const data = await response.json();
      return data;
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};

export async function patch({ route, data, config }: { route: string; data: any; config: { headers: any } }) {
  return fetch(ENDPOINT + route, {
    method: "PATCH", // or 'PUT'
    headers: {
      ...config.headers,
    },
    body: data,
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const err = await response.json();
        throw err;
      }
    })
    .catch((err) => {
      // console.log('POST err', err);
      throw err;
    });
};
export async function get({ route, config }: { route: string; config: { headers: any } }) {
  return fetch(ENDPOINT + route, {
    method: "GET", // or 'PUT'
    ...config,
  })
    .then((response) => response.json())
    .catch((err) => logErr(err));
};

export async function put({ route, data, config }: { route: string; data: any; config: { headers: any } }) {
  return fetch(ENDPOINT + route, {
    method: "PUT",
    headers: {
      ...config.headers,
    },
    body: data,
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const err = await response.json();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
};
export async function deleteReq({ route, config }: { route: string; config: { headers: any } }) {
  return fetch(ENDPOINT + route, {
    method: "DELETE",
    headers: {
      ...config.headers,
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.text();
      } else {
        const err = await response.json();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
};
