"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScopedI18n } from "@/locales/client";
import { FacebookIcon, InstagramIcon } from "lucide-react";

export const Footer = () => {
  const t = useScopedI18n("homepage");
  const tt = useScopedI18n("commons");

  return (
    <motion.footer
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-full bg-slate-900 flex w-full flex-col justify-center pt-8 max-md:pt-0 px-40 pb-8 max-md:px-4 max-md:max-w-full ">
      <div className="flex w-full max-w-full items-stretch justify-between gap-5 max-md:flex-wrap">
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
              <div className="text-white text-base leading-7 tracking-normal max-md:mt-10">
                <h4 className="text-xl font-semibold tracking-tight">
                  {t("aboutThePortal")}
                  <br />
                </h4>
                <span className="font-bold">
                  <br />
                </span>
                <span className="">
                  <Link href="#">{t("aboutNEHR")}</Link>
                  <br />
                  <Link href="#">{t("contributingOrganizations")}</Link>
                  <br />
                  <Link href="#">{tt("contactUs")}</Link>
                  <br />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                <div className="text-white text-base leading-7 tracking-normal max-md:max-w-full">
                  <h4 className="text-xl font-semibold tracking-tight">
                    {t("importantLinks")}
                    <br />
                  </h4>
                  <span className="">
                    <br />
                    <Link href="#">{t("ministryOfHealth")}</Link>
                    <br />
                    <Link href="#">{t("healthInformationUnit")}</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex basis-[0%] flex-col items-stretch self-start max-md:mt-10">
          <div className="text-white text-xl font-extrabold leading-7 tracking-normal whitespace-nowrap">
            {t("socialMedia")}
          </div>
          <div className="flex justify-start gap-5 mt-9 max-md:justify-center">
            <Link href="#">
              <FacebookIcon color="white" size={24} />
            </Link>
            <Link href="#">
              <InstagramIcon color="white" size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-slate-600 text-xs leading-7 whitespace-nowrap items-center mt-32 max-md:mt-10">
        {new Date().getFullYear()} {t("copyRightInfo")}
      </div>
    </motion.footer>
  );
};
