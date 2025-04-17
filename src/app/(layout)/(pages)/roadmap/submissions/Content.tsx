"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { SubmissionDetailT, SubmissionBoardT } from "../../../../../types/product";
import CreateReq from "./CreateReq";
import FeatureRequests from "./FeatureRequests";
import { getProductSubmissionApi } from "../../../../../network/api/product/roadmap";
import { ApiResType } from "../../../../../types/enum";
import { useAuth } from "../../../../../context/AuthContext";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useDomainCtx } from "../../../context/DomainCtxProvider";
import { Feature_requests } from "../../../../../utils/helpers";

const limit = 6;

export default function Content({ allSubmissions }: { allSubmissions: SubmissionDetailT[] }) {
  const { token } = useAuth();
  const { boards } = useDomainCtx();
  const [page, setPage] = useState(Feature_requests.page);

  const [loading, setLoading] = useState(Feature_requests.loading);
  const [hasMore, setHasMore] = useState(Feature_requests.hasMore);

  const [isTsearch, setIsTsearch] = useState(false);
  const [search, setSearch] = useState("");
  const [tsearch, setTsearch] = useState("");
  const [dSearch] = useDebounce(isTsearch ? tsearch : search, 300);

  const [boardFilter, setBoardFilter] = useState({} as SubmissionBoardT);
  const [topicFilter, setTopicFilter] = useState([] as number[]);

  const [remove, setRemove] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (allSubmissions?.length > 0) {
      Feature_requests.setData(allSubmissions || []);
    }
  }, [allSubmissions]);

  const host = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT ? process.env.NEXT_PUBLIC_DOMAIN : typeof window !== "undefined" ? window.location.host : "";

  useEffect(() => {
    let slug = searchParams.get("board");
    if (slug) {
      setBoardFilter(boards?.filter((i) => i?.slug === slug)[0]);
    }
  }, [searchParams, boards]);

  useEffect(() => {
    let active = true;
    if (!host) return;

    if (Feature_requests.redirected) {
      setLoading(false);
      return;
    }

    async function fetchProductSubmission() {
      try {
        setLoading(true);
        const res = await getProductSubmissionApi({
          ...(token ? { token } : {}),
          domain: host || "",
          page: page?.toString(),
          limit: limit?.toString(),
          search: dSearch,
          ...(Object?.keys(boardFilter).length > 0 && {
            board_slug: boardFilter?.slug,
          }),
          ...(topicFilter?.length > 0 ? { topic_id: topicFilter?.join(",") } : {}),
        });

        if (!active) return;

        if (res?.type === ApiResType.SUCCESS) {
          if (page === 1) {
            Feature_requests.setData(res?.data);
          } else {
            Feature_requests.setData([...(Feature_requests.data || []), ...res?.data]);
          }
        }

        if (res?.type === ApiResType.ERROR) {
          setLoading(false);
          setHasMore(false);
        }
        if (res?.data?.length < limit) {
          setHasMore(false);
        }
        setLoading(false);
      } catch (error) {
        setHasMore(false);
        setLoading(false);
        console.log(error, "something went wrong");
      }
    }
    fetchProductSubmission();
    return () => {
      active = false;
    };
  }, [token, host, page, dSearch, boardFilter, topicFilter]);

  const loadMoreData = useCallback(() => {
    if (search) return;
    Feature_requests.setRedirected(false);
    setPage((p) => p + 1);
  }, [search]);

  useEffect(() => {
    Feature_requests.setNextPage(page);
  }, [page]);

  useEffect(() => {
    Feature_requests.setLoading(loading);
  }, [loading]);

  useEffect(() => {
    Feature_requests.setHasMore(hasMore);
  }, [hasMore]);

  useEffect(() => {
    const isFilter = Object?.keys(boardFilter).length > 0 || topicFilter?.length > 0;
    if (!isFilter) return;
    setPage(1);
    Feature_requests.setData([]);
    setHasMore(true);
  }, [boardFilter, topicFilter]);

  function onSearchChange(val: string) {
    setSearch(val);
    setPage(1);
    setHasMore(true);
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start">
      <CreateReq
        tsearch={tsearch}
        onTitleChange={(v: string) => setTsearch(v)}
        onFocus={() => {
          setIsTsearch(true);
          setSearch("");
        }}
        onCreate={(fr) => {
          Feature_requests.setData([fr, ...(Feature_requests.data || [])]), setBoardFilter({} as SubmissionBoardT), setTsearch("");
        }}
      />
      <FeatureRequests
        list={Feature_requests.data}
        onFocus={() => {
          setIsTsearch(false);
          setTsearch("");
        }}
        onRemove={() => setRemove(remove + 1)}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        hasMore={hasMore}
        loadMoreData={loadMoreData}
        loading={loading}
        boardFilter={boardFilter}
        setBoardFilter={setBoardFilter}
        search={search}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}
