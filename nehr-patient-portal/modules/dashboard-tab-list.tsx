import { TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
}

export const DashboardTabList = () => {
  const { t } = useTranslation("dashboard");

  const tabs: Tab[] = [
    {
      label: t("recordHome"),
      value: "record-home",
      disabled: false,
    },
    {
      label: t("myProfile"),
      value: "my-profile",
      disabled: true,
    },
    {
      label: t("myPHNs"),
      value: "my-phns",
      disabled: true,
    },
    {
      label: t("mySubmissions"),
      value: "my-submissions",
      disabled: true,
    },
    {
      label: t("privacyAndAccess"),
      value: "privacy-and-access",
      disabled: true,
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
