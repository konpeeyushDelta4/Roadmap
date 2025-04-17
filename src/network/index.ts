import { log, logErr } from "../utils/helpers";

// Make sure endpoint never resolves to undefined
export const ENDPOINT = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ;

export async function post({ route, data, config, reval, cache = "force-cache" }: {
  route: string; data: any; config?: { headers: any }; reval?: any;
  cache?: "force-cache" | "no-cache" | "reload" | "only-if-cached" | "default" | undefined
}) {
  if (!ENDPOINT) {
    console.error("API Endpoint is not defined");
    return { type: "ERROR", message: "API Endpoint is not configured", code: 500 };
  }
  
  try {
    const response = await fetch(ENDPOINT + route, {
      method: "POST",
      headers: {
        ...config?.headers,
      },
      body: data,
      cache,
      ...(reval ? { next: reval } : {}),
    });

    if (!response.ok) {
      let errorMessage;
      try {
        // Try to parse as JSON first
        const errorData = await response.json();
        errorMessage = errorData.message || `Server error: ${response.status}`;
      } catch (parseError) {
        // Fallback to text if not JSON
        try {
          const text = await response.text();
          errorMessage = text || `Server error: ${response.status}`;
        } catch (textError) {
          // Last resort if we can't get text either
          errorMessage = `Server error: ${response.status}`;
        }
      }
      
      return { type: "ERROR", message: errorMessage, code: response.status };
    }
    
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("Fetch error:", err);
    return { type: "ERROR", message: err instanceof Error ? err.message : "Unknown error occurred", code: 500 };
  }
}

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
