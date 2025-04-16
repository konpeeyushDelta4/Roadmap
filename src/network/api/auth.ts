import { post } from "../index";

export async function socialLoginApi({ ...raw }: { firebase_uid: string; email?: string; type?: string; role?: "user" | "admin" | "editor", name?: string, first_name?: string, last_name?: string }) {
  return post({
    route: "/api/v1/socialLogin",
    data: JSON.stringify(raw),
    config: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
}

export async function sendMagicLinkOnEmailApi({ email, domain }: { email: string; domain: string }) {
  return post({
    route: "/api/v1/sendMagicLinkOnEmail",
    data: JSON.stringify({ email }),
    config: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
}

export async function verifyMagicLinkApi({ hash }: { hash: string }) {
  return post({
    route: "/api/v1/verifyMagicLink",
    data: JSON.stringify({ hash }),
    config: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
}


