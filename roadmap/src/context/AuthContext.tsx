"use client";
import { isJSON, logErr } from "../utils/helpers";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ApiResType, Role } from "../types/enum";
import { getUserDetailApi } from "../network/api/user";
import { UserD } from "../types/user";
import Cookies from "js-cookie"; 
import { SocialLoginD } from "../types";
import { firebaseApp } from "../network/firebase";
import { socialLoginApi } from "../network/api/auth";

let auth: any;

if (typeof window !== "undefined") {
  auth = getAuth(firebaseApp);
}

type AuthContextT = {
  token: string;
  onLoginSuccess: (s: any) => void;
  onLogout: () => void;
  role: Role | null;
  loginOpen: boolean;
  setLoginOpen: Dispatch<React.SetStateAction<boolean>>;
  user: UserD;
  setUser: Dispatch<React.SetStateAction<UserD>>;
  onLogin: (type: SocialLoginD) => Promise<{ login: boolean } | undefined>;
  loading: boolean;
  onSSOloginSuccess: (t: string) => void;
};

const AuthCtx = createContext({} as AuthContextT);

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>(() => {
    if (process.env.NODE_ENV === "development") {
      if (process.env.NEXT_PUBLIC_TOKEN) {
        return process.env.NEXT_PUBLIC_TOKEN;
      } else {
        return Cookies.get("epic_token") || "";
      }
    } else {
      return Cookies.get("epic_token") || "";
    }
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState({} as UserD);
  const [loadingType, setLoadingType] = useState<SocialLoginD | null>(null);
  const [loading, setLoading] = useState(false);

  function onSSOloginSuccess(t: string) {
    if (!t) return;
    setToken(t);
  }

  function onLoginSuccess({ data, persist }: { data: any; persist: boolean }) {
    // localStorage.setItem("epic_token", JSON.stringify(data.token));
    Cookies.set("epic_token", data.token, { expires: 365 });

    setToken(data?.token);
    setLoginOpen(false);
  }

  function onLogout() {
    let host;
    if (typeof window !== "undefined") {
      host = window.location.hostname;
    }
    Cookies.remove("epic_token");
    Cookies.remove("epic_token", { domain: host });

    setToken("");
    setUser({} as UserD);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error: any) => {
        // An error happened.
      });
  }

  useEffect(() => {
    const getUser = async () => {
      if (!token) return;
      try {
        const res = await getUserDetailApi({ token });
        if (res.type === ApiResType.SUCCESS) {
          setUser(res.data);
        }
        if (res?.type === ApiResType.ERROR) {
          if (res?.code === 401) {
            console.error("User not found");
            onLogout();
          }
        }
      } catch (err) {
        console.log("Err", err);
      }
    };

    if (token) {
      getUser();
    }
  }, [token]);

  const onLogin = async (type: SocialLoginD) => {
    try {
      setLoading(true);
      // setError(false);
      if (loadingType) {
        return;
      }

      let provider;

      switch (type) {
        case "google":
          provider = new GoogleAuthProvider();
          break;
        case "twitter":
          provider = new TwitterAuthProvider();
          break;
        case "github":
          provider = new GithubAuthProvider();
          break;
        default:
          provider = new GoogleAuthProvider();
      }

      setLoadingType(type);

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      // IdP data available using getAdditionalUserInfo(result)
      const res = await socialLoginApi({
        firebase_uid: user.uid,
        email: user.email || "",
        type: type,
        name: user.displayName || "",
        first_name: user.displayName || "",
        role: Role.USER,
      });

      setLoadingType(null);

      if (res.type === ApiResType.SUCCESS) {
        onLoginSuccess({ data: res?.data, persist: true });
      }

      setLoading(false);
      if (res.type === ApiResType.SUCCESS) {
        return { login: true };
      } else {
        return { login: false };
      }
    } catch (err: any) {
      setLoading(false);
      setLoadingType(null);
      logErr("Err", err);
      return { login: false };
    }
  };

  return (
    <AuthCtx.Provider
      value={{
        loginOpen,
        user,
        setLoginOpen,
        onLogout,
        token,
        role: user?.role || null,
        onLoginSuccess,
        setUser,
        onLogin,
        loading,
        onSSOloginSuccess,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}

// useEffect(() => {
//   if (process.env.NEXT_PUBLIC_TOKEN !== undefined && process.env.NEXT_PUBLIC_TOKEN) {
//     setToken(process.env.NEXT_PUBLIC_TOKEN);
//     Cookies.set("epic_token", process.env.NEXT_PUBLIC_TOKEN, { expires: 365 });
//     return;
//   }

//   const checkAuth = () => {
//     // const t = localStorage.getItem("epic_token");
//     const c = Cookies.get("epic_token");
//     if (c) {
//       setToken(c);
//     }
//     // if (t && isJSON(t)) {
//     //   setToken(JSON.parse(t));
//     // }
//   };

//   checkAuth();
// }, []);
