import { useRouter as useProgressRouter } from "next-nprogress-bar";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + "//" + target.host + target.pathname;
  const cleanCurrent =
    current.protocol + "//" + current.host + current.pathname;

  return cleanTarget === cleanCurrent;
}

export default function useCustomRouter() {
  const router = useProgressRouter();

  function push(href: string, options?: NavigateOptions) {
    return router.push(href, options);
  }

  function back() {
    return router.back();
  }

  return { ...router, push, back };
}
