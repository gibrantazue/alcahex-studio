import { appStore } from "../../src/app/store";
import { ArchiveWithItemCount } from "../../types/archive";
import { fetcher } from "../../src/lib/utils";
import useSWR from "swr";

export const useArchives = () => {
  return useSWR<ArchiveWithItemCount[]>("/api/archive", fetcher, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onSuccess: (data: ArchiveWithItemCount[]) => {
      appStore.setState({
        archiveList: data,
      });
    },
  });
};

