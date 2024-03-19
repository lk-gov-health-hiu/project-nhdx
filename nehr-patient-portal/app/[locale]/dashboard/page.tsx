"use client";

import { NavBar } from "@/modules/nav-bar";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { RecordHome } from "@/modules/record-home";
import { MyPHNs } from "@/modules/my-phns";
import { MyCommunications } from "@/modules/my-communications";
import { PrivacyAndAccess } from "@/modules/privacy-and-access";
import { DashboardTabList } from "@/modules/dashboard-tab-list";
import { AccessHistory } from "@/modules/access-history";

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col w-full my-8 max-w-6xl mx-auto px-4 overflow-x-hidden">
        <Tabs defaultValue="record-home">
          <TabsList>
            <DashboardTabList />
          </TabsList>
          <div className="mt-5 md:mt-8">
            <TabsContent value="record-home">
              <RecordHome />
            </TabsContent>
            <TabsContent value="my-phns">
              <MyPHNs />
            </TabsContent>
            <TabsContent value="my-communications">
              <MyCommunications />
            </TabsContent>
            <TabsContent value="access-history">
              <AccessHistory />
            </TabsContent>
            <TabsContent value="privacy-and-access">
              <PrivacyAndAccess />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </>
  );
}
