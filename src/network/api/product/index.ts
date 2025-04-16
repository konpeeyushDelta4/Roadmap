import { ProductPlatformE, ProductPricingE, ProductStatusE, SignedUrlTypeD } from "../../../types/enum";
import { post } from "../../index";
import { MediaContentType, MediaType } from "../../../types/media";

export async function getAllProductApi({
  token,
  reval,
  ...raw
}: {
  token?: string;
  reval?: any;
  page: string;
  orderBy?: "asc" | "desc";
  search?: string;
  limit: string;
  by_price?: string;
  categories?: string;
  filter_by?: string;
  language?: string;
}) {
  return post({
    route: "/api/v1/getAllProduct",
    data: JSON.stringify(raw),
    ...(reval ? { reval } : {}),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function getProductDetailApi({ token, reval, ...raw }: { token?: string; slug?: string; language?: string; reval?: any; product_id?: any }) {
  return post({
    route: "/api/v1/getProductDetail",
    data: JSON.stringify(raw),
    ...(reval ? { reval } : {}),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function addProductApi({
  token,
  ...raw
}: {
  token: string;
  title: string;
  platform?: ProductPlatformE;
  pricing?: ProductPricingE;
  starting_price?: string;
  has_trial?: "0" | "1";
  website_url?: string;
  categories?: string;
  short_description?: string;
  description?: string;
  language?: string;
  logo?: string;
  product_media_id?: string;
  status?: ProductStatusE;
}) {
  return post({
    route: "/api/v1/addProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function updateProductApi({
  token,
  ...raw
}: {
  token: string;
  product_id: string;
  title?: string;
  platform?: ProductPlatformE;
  pricing?: ProductPricingE;
  starting_price?: string;
  has_trial?: "0" | "1";
  website_url?: string;
  categories?: string;
  short_description?: string;
  description?: string;
  language?: string;
  logo?: string;
  product_media_id?: string;
  status?: ProductStatusE;
}) {
  return post({
    route: "/api/v1/updateProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getSignedUrlApi({ token, ...raw }: { token: string; file_name: string; type: MediaType }) {
  return post({
    route: "/api/v1/getSignedUrl",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addProductDetailMediaApi({ token, ...raw }: { token: string; media_url: string; type: MediaType; content_type: MediaContentType }) {
  return post({
    route: "/api/v1/addProductDetailMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addProductupvoteApi({ token, ...raw }: { token: string; status: string; product_id: string }) {
  return post({
    route: "/api/v1/addProductupvotes",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function addProductViewApi({ token, ...raw }: { token: string; product_id: string }) {
  return post({
    route: "/api/v1/addProductView",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function deleteProductApi({ token, ...raw }: { token: string; product_id: string }) {
  return post({
    route: "/api/v1/removeUserProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getAllfeaturedProductApi({ reval, ...raw }: { page: number; limit: number; reval?: any }) {
  return post({
    route: "/api/v1/getAllfeaturedProduct",
    data: JSON.stringify(raw),
    // ...(next ? { next } : {}),
    ...(reval ? { reval: reval } : {}),
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
  });
}

export async function getMyProductApi({ token, ...raw }: { token: string; language?: string; limit: string; page: string }) {
  return post({
    route: "/api/v1/getMyProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getRelatedProductApi({ token, ...raw }: { token: string; category_id: string; page: string; limit: string; language?: string }) {
  return post({
    route: "/api/v1/getRelatedProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function removeProductDetailMediaApi({ token, ...raw }: { token: string; product_id: string; product_detail_media_id: string; product_detail_id: string }) {
  return post({
    route: "/api/v1/removeProductDetailMedia",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function removeLogoApi({ token, ...raw }: { token: string; product_id: string }) {
  return post({
    route: "/api/v1/removeProductLogo",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getProductByYearApi({ token, ...raw }: { token?: string; orderBy?: string; year: any; category_id: string }) {
  return post({
    route: "/api/v1/getProductByYear",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}
export async function recommendationApi({ token, ...raw }: { token?: string; search?: string; language?: string }) {
  return post({
    route: "/api/v1/recommendation",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}
export async function getProductByTopicApi({ slug }: { slug: string; limit: string; page: string; language?: string }) {
  return post({
    route: "/api/v1/getProductByTopic",
    data: JSON.stringify({ slug }),
    config: {
      headers: {
        Authorization: "Bearer ",
        "content-type": "application/json",
      },
    },
  });
}

export async function getProductByDateRangeApi({ token, ...raw }: { token?: string; from?: string; to?: string; page?: string; limit?: string; orderBy?: "ASC" | "DESC"; category_id: string }) {
  return post({
    route: "/api/v1/getProductByDateRange",
    data: JSON.stringify(raw),
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function claimMyProductApi({ token, ...raw }: { token: string; product_id?: string; slug: string; type: "email" | "dns" | "meta"; email: string; status: string }) {
  return post({
    route: "/api/v1/claimMyProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function verifyClaimProductApi({ token, hash }: { token: string; hash: string }) {
  return post({
    route: "/api/v1/verifyClaimProduct",
    data: JSON.stringify({ hash }),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

// claimMyProductByMeta
export async function generateHashApi({ token, ...raw }: { token: string; slug: string }) {
  return post({
    route: "/api/v1/generateHash",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function verifyClaimProductByMetaApi({ token, slug }: { token: string; slug: string }) {
  return post({
    route: "/api/v1/verifyClaimProductByMeta",
    data: JSON.stringify({ slug }),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function claimMyProductbyDNSApi({ token, ...raw }: { token: string; slug: string }) {
  return post({
    route: "/api/v1/verifyClaimProductByDNS",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function getProductByDomain({ token, reval, domain }: { token?: string; domain: string, reval?: any }) {
  console.log("domain1", domain,token);

  return post({
    route: "/api/v1/getProductDetailByDomain",
    data: JSON.stringify({ domain }),
    reval,
    config: {
      headers: {
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "content-type": "application/json",
      },
    },
  });
}

export async function subscribeProductApi({ token, ...raw }: { token: string; slug?: string; subscribed_events: string; product_id?: string }) {
  return post({
    route: "/api/v1/subscribeProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function unsubscribeProductApi({ token, ...raw }: {
  token: string; slug?: string;
  product_id?: string
}) {
  return post({
    route: "/api/v1/unsubscribeProduct",
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}

export async function loginWithSSOApi({ jwt_token, return_to }: { jwt_token: string; return_to: string }) {
  return post({
    route: "/api/v1/loginWithSSO",
    data: JSON.stringify({ jwt_token, return_to }),
    config: {
      headers: {
        // Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    },
  });
}
