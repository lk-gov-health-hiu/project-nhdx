"use client";

import { PersonalInfo } from "@/components/forms/record-home/personal-info";
import { OverviewCard } from "@/components/overview-card";
import { DASHBOARD } from "@/locales/namespaces";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FaClinicMedical,
  FaFileMedicalAlt,
  FaHeadSideCough,
  FaNotesMedical,
} from "react-icons/fa";

export const RecordHome = () => {
  const { t } = useTranslation(DASHBOARD);
  const form = useForm();

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title={t("encounters")}
          value="120"
          lastMonthValue="20"
          icon={<FaClinicMedical className="h-5 w-5 text-muted-foreground" />}
        />
        <OverviewCard
          title={t("labReports")}
          value="3"
          lastMonthValue="2"
          icon={<FaFileMedicalAlt className="h-5 w-5 text-muted-foreground" />}
        />
        <OverviewCard
          title={t("prescriptions")}
          value="5"
          lastMonthValue="1"
          icon={<FaNotesMedical className="h-5 w-5 text-muted-foreground" />}
        />
        <OverviewCard
          title={t("allergies")}
          value="2"
          lastMonthValue="1"
          icon={<FaHeadSideCough className="h-5 w-5 text-muted-foreground" />}
        />
      </div>
      <PersonalInfo />
    </div>
  );
};
