"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { useScopedI18n } from "@/locales/client";

interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
}

export const DashboardTabList = () => {
  const t = useScopedI18n("dashboard");

  const tabs: Tab[] = [
    {
      label: t("recordHome"),
      value: "record-home",
    },
    {
      label: t("myPHNs"),
      value: "my-phns",
    },
    {
      label: t("myCommunications"),
      value: "my-communications",
    },
    {
      label: t("accessHistory"),
      value: "access-history",
    },
    {
      label: t("privacyAndAccess"),
      value: "privacy-and-access",
    },
  ];

  return (
    <>
      {tabs.map(({ value, disabled, label }) => (
        <TabsTrigger key={value} value={value} disabled={disabled}>
          {label}
        </TabsTrigger>
      ))}
    </>
  );
};
