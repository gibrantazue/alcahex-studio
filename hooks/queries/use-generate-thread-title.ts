"use client";

import { ChatModel } from "../../types/chat";
import { useCallback } from "react";

export function useGenerateThreadTitle(option: {
  threadId: string;
  chatModel?: ChatModel;
}) {
  const generateTitle = useCallback(
    (message: string) => {
      // Simplified implementation for landing page
      console.log('Generate title for:', message);
      return Promise.resolve();
    },
    [option.threadId],
  );

  return generateTitle;
}

