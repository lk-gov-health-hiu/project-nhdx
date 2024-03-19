"use client";

import { OverviewCard } from "@/components/overview-card";
import { MedicalHistoryTimeline } from "./medical-history-timeline";
import { TitleSeparator } from "@/components/title-separator";
import { useScopedI18n } from "@/locales/client";

export const RecordHome = () => {
  const t = useScopedI18n("dashboard");

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title={t("encounters")} value="120" lastMonthValue="20" />
        <OverviewCard title={t("labReports")} value="3" lastMonthValue="2" />
        <OverviewCard title={t("prescriptions")} value="5" lastMonthValue="1" />
        <OverviewCard title={t("allergies")} value="2" lastMonthValue="1" />
      </div>

      <TitleSeparator title={t("medicalHistory")} />

      <MedicalHistoryTimeline />
    </>
  );
};
