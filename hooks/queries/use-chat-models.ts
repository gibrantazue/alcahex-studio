import { appStore } from "../../src/app/store";
import { fetcher } from "../../src/lib/utils";
import useSWR from "swr";

export const useChatModels = () => {
  return useSWR<
    {
      provider: string;
      models: {
        name: string;
        isToolCallUnsupported: boolean;
      }[];
    }[]
  >("/api/chat/models", fetcher, {
    dedupingInterval: 60_000 * 5,
    revalidateOnFocus: false,
    fallbackData: [],
    onSuccess: (data: any) => {
      appStore.setState({ chatModels: data });
    },
  });
};

