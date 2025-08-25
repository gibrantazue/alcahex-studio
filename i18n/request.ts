import { getRequestConfig } from "next-intl/server";
import { getLocaleAction } from "./get-locale";

// Simple merge function to replace deepmerge dependency
function mergeMessages(defaultMessages: any, messages: any) {
  return { ...defaultMessages, ...messages };
}

let defaultMessages: any = undefined;

export default getRequestConfig(async () => {
  const locale = await getLocaleAction();

  if (!defaultMessages) {
    defaultMessages = (await import(`../messages/en.json`)).default;
  }

  let messages;
  try {
    const messageModule = await import(`../messages/${locale}.json`);
    messages = messageModule.default;
  } catch (error) {
    messages = defaultMessages;
  }

  return {
    locale,
    messages:
      locale === "en" ? defaultMessages : mergeMessages(defaultMessages, messages),
    getMessageFallback({ key, namespace }) {
      return `${namespace}.${key}`;
    },
  };
});

