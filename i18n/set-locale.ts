"use server";

import { COOKIE_KEY_LOCALE, SUPPORTED_LOCALES } from "../src/lib/const";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function validateLocale(locale?: string): boolean {
  return SUPPORTED_LOCALES.some((v) => v.code === locale);
}

export async function setLocale(locale: string) {
  if (!validateLocale(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_KEY_LOCALE, locale);
  redirect('/');
}

export async function setLocaleAction(locale: string) {
  if (!validateLocale(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_KEY_LOCALE, locale);
}

