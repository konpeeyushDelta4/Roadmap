"use client";
import { useAuth } from "../../context/AuthContext";
import { getProductDetailApi } from "../../network/api/product";
// import { getSubscriptionApi } from "../../network/api/subscription";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubscriptionDetailT } from "../../types";
import { ApiResType, SubscriptionDurationE, SubscriptionE } from "../../types/enum";
import { ProductDetailD, SubmissionBoardT } from "../../types/product";

type ProductContextT = {
  prodDetail: ProductDetailD;
  setProdDetail: React.Dispatch<React.SetStateAction<ProductDetailD>>;
  isEpic: boolean;
  boards: SubmissionBoardT[];
  subscriptionDetail: SubscriptionDetailT;
  planName: SubscriptionE;
  setPlanName: React.Dispatch<React.SetStateAction<SubscriptionE>>;
  planDuratoin: SubscriptionDurationE;
  setPlanDuratoin: React.Dispatch<React.SetStateAction<SubscriptionDurationE>>;
  isFree: boolean | null;
};

const ProductContext = createContext({} as ProductContextT);

export default function ProductProvider({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; locale: string };
}) {
  const { locale, slug } = params;
  const { token } = useAuth();
  const pathname = usePathname();

  const [prodDetail, setProdDetail] = useState({} as ProductDetailD);
  const [boards, setBoards] = useState([] as SubmissionBoardT[]);

  const [isEpic, setIsEpic] = useState<boolean>(true);

  const [planDuratoin, setPlanDuratoin] = useState(SubscriptionDurationE.NONE);
  const [planName, setPlanName] = useState(SubscriptionE.FREE);
  const [isFree, setIsFree] = useState<boolean | null>(null);
  const [subscriptionDetail, setSubscriptionDetail] = useState(
    {} as SubscriptionDetailT
  );

  // const fetchSubscription = useCallback(async () => {
  //   if (!token || !prodDetail?.id) return;
  //   try {
  //     const res = await getSubscriptionApi({
  //       token,
  //       product_id: prodDetail?.id?.toString(),
  //     });
  //     if (res?.type === ApiResType.SUCCESS) {
  //       const duration = res?.data?.plan_name?.split("_")[1];
  //       setPlanDuratoin(duration || "");
  //       setSubscriptionDetail(res?.data || ({} as SubscriptionDetailT));
  //       setPlanName(res?.data?.plan_name || SubscriptionE.FREE);
  //       setIsFree(false);
  //     }
  //     if (res?.type === ApiResType.ERROR) {
  //       setIsFree(true);
  //     }
  //   } catch (error) {
  //     setIsFree(true);
  //     console.log(error, "something went wrong");
  //   }
  // }, [token, prodDetail?.id]);

  // useEffect(() => {
  //   fetchSubscription();
  // }, [fetchSubscription]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isEpic = ["epicxplorer", "localhost"].includes(
        window.location.hostname
      );
      setIsEpic(isEpic);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    async function getDetail() {
      try {
        const res = await getProductDetailApi({
          token,
          slug: slug,
          language: locale,
        });
        if (res?.type === ApiResType.SUCCESS) {
          setProdDetail(res?.data || []);
          setBoards(res?.data?.submission_boards || []);
        }
      } catch (error) {
        console.log(error, "something went wrong");
      }
    }
    getDetail();
  }, [token, slug, locale]);

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    handleRouteChange();
  }, [pathname]);

  return (
    <ProductContext.Provider
      value={{
        prodDetail,
        setProdDetail,
        isEpic,
        boards,
        subscriptionDetail,
        planName,
        setPlanName,
        planDuratoin,
        setPlanDuratoin,
        isFree,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProdDetail = () => useContext(ProductContext);
