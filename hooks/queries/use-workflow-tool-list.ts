"use client";
import useSWR, { SWRConfiguration } from "swr";
import { appStore } from "../../src/app/store";
import { fetcher } from "../../src/lib/utils";

export function useWorkflowToolList(options?: SWRConfiguration) {
  return useSWR("/api/workflow/tools", fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    focusThrottleInterval: 1000 * 60 * 30,
    fallbackData: [],
    onSuccess: (data: any) => {
      appStore.setState({ workflowToolList: data });
    },
    ...options,
  });
}

