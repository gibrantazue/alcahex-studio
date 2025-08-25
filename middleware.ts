import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './src/lib/const';

export default createMiddleware({
  locales: SUPPORTED_LOCALES.map(locale => locale.code),
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'never'
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};

