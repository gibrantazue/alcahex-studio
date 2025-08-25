"use client";
import { appStore } from "../../src/app/store";
import useSWR, { SWRConfiguration } from "swr";
import { handleErrorWithToast } from "../../src/components/ui/shared-toast";
import { fetcher } from "../../src/lib/utils";
import { Agent } from "../../types/agent";

export function useAgents(options?: SWRConfiguration) {
  return useSWR<Omit<Agent, "instructions">[]>("/api/agent", fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
    fallbackData: [],
    onError: handleErrorWithToast,
    onSuccess: (data: Omit<Agent, "instructions">[]) => {
      appStore.setState({ agentList: data });
    },
    ...options,
  });
}

