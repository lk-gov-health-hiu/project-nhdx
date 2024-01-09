"use client";

import { TranslationsProvider } from "@/contexts/translations-provider";
import { NavBar } from "@/modules/nav-bar";
import { DASHBOARD, HOME } from "@/locales/namespaces";
import initTranslations from "@/app/i18n";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { RecordHome } from "@/modules/record-home";
import { MyProfile } from "@/modules/my-profile";
import { MyPHNs } from "@/modules/my-phns";
import { MySubmissions } from "@/modules/my-submissions";
import { PrivacyAndAccess } from "@/modules/privacy-and-access";
import { DashboardTabList } from "@/modules/dashboard-tab-list";

const i18nNamespaces = [HOME, DASHBOARD];

export default async function Dashboard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col w-full my-8 md:px-40 max-md:px-4"
      >
        <Tabs defaultValue="record-home">
          <TabsList>
            <DashboardTabList />
          </TabsList>
          <div className="mt-9">
            <TabsContent value="record-home">
              <RecordHome />
            </TabsContent>
            <TabsContent value="my-profile">
              <MyProfile />
            </TabsContent>
            <TabsContent value="my-phns">
              <MyPHNs />
            </TabsContent>
            <TabsContent value="my-submissions">
              <MySubmissions />
            </TabsContent>
            <TabsContent value="privacy-and-access">
              <PrivacyAndAccess />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </TranslationsProvider>
  );
}
