"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { signIn, useSession } from "next-auth/react";

export const HeroSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full my-32 text-center items-center md:px-40 max-md:px-4"
    >
      <>
        <h1 className="text-slate-900 text-center text-5xl font-extrabold tracking-tighter self-center max-w-[814px] max-md:max-w-full max-md:text-4xl max-md:leading-10 max-md:mt-10">
          {t("heroHeading")}
        </h1>
        <p className="text-slate-500 text-center text-base leading-7 self-center max-w-[694px] mt-3 max-md:max-w-full">
          {t("heroSubHeading")}
        </p>
        {status === "unauthenticated" ? (
          <div className="flex mt-2 lg:mt-4 gap-2">
            <Button onClick={() => signIn("asgardeo")}> {t("signIn")}</Button>
            <Button variant="outline" onClick={() => signIn("asgardeo")}>
              {t("register")}
            </Button>
          </div>
        ) : (
          <div className="flex mt-2 lg:mt-4 gap-2">
            <Button onClick={() => router.push("#")}>
              {t("goToDashboard")}
            </Button>
          </div>
        )}
      </>
    </motion.div>
  );
};
