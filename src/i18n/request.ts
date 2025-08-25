import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { COOKIE_KEY_LOCALE, DEFAULT_LOCALE } from '../lib/const';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get(COOKIE_KEY_LOCALE)?.value || DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
