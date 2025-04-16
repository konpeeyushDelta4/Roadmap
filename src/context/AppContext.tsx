"use client";
import { getAllCategoryApi } from "../network/api/admin/category";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { CategoryD } from "../types";
import { ApiResType } from "../types/enum";
import { TopicsItemD } from "../types/topics";

type AppContextType = {
  categories: CategoryD[] | null;
  shortcutHelpOpen: boolean;
  setShortcutHelpOpen: Dispatch<SetStateAction<boolean>>;
  topics: TopicsItemD[];
  setTopics: Dispatch<SetStateAction<TopicsItemD[]>>;
};

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useApp = () => useContext(AppContext);

export default function AppProvider(p: any) {
  const [categories, setCategories] = useState<CategoryD[] | null>(null);
  const [shortcutHelpOpen, setShortcutHelpOpen] = useState<boolean>(false);
  const [topics, setTopics] = useState<TopicsItemD[]>([]);

  // const [products, setProducts] = useState<GetProductByTopicD[]>([]);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const res = await getAllCategoryApi();
        if (res.type === ApiResType.SUCCESS) {
          setCategories(res.data);
        }
        // if (res.type === ApiResType.ERROR) {
        //   toast.error(res.message);
        // }
      } catch (err) {
        console.log(err);
      }
    };

    getConfig();
  }, []);

  return (
    <AppContext.Provider
      value={{
        categories,
        shortcutHelpOpen,
        setShortcutHelpOpen,
        topics,
        setTopics,
      }}
    >
      {p.children}
    </AppContext.Provider>
  );
}
