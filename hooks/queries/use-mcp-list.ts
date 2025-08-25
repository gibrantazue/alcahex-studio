"use client";
import { appStore } from "../../src/app/store";
import useSWR, { SWRConfiguration } from "swr";
import { handleErrorWithToast } from "../../src/components/ui/shared-toast";
import { fetcher } from "../../src/lib/utils";

export function useMcpList(options?: SWRConfiguration) {
  return useSWR("/api/mcp/list", fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 0,
    focusThrottleInterval: 1000 * 60 * 5,
    fallbackData: [],
    onError: handleErrorWithToast,
    onSuccess: (data: any) => {
      const ids = data.map((v: any) => v.id);
      appStore.setState((prev) => ({
        mcpList: data,
        // allowedMcpServers: objectFlow(prev.allowedMcpServers || {}).filter(
        //   (_, key) => ids.includes(key),
        // ),
      }));
    },
    ...options,
  });
}

