"use client";
import Link from "next/link";
import { useScopedI18n } from "@/locales/client";

export const NavbarLinks = () => {
  const t = useScopedI18n("commons");

  return (
    <>
      <Link href="#">{t("faq")}</Link>
      <Link href="#">{t("contactUs")}</Link>
    </>
  );
};
