"use client";

import { ReactNode } from "react";
import { LuLandmark, LuChevronRight } from "react-icons/lu";

type EncounterType =
  | "OPD Encounters"
  | "Admission Summery"
  | "HCL Screening"
  | "Lab Reports"
  | "Appoinments"
  | "Vaccinations";

export type Milestone = {
  id: string;
  institution: string;
  date: string;
  time: string;
  encounterType: EncounterType;
};

const EncounterTypeColors: Record<EncounterType, string> = {
  "OPD Encounters": "#10b981",
  "Admission Summery": "#eab308",
  "HCL Screening": "#ef4444",
  "Lab Reports": "#06b6d4",
  Appoinments: "#3b82f6",
  Vaccinations: "#d946ef",
};

export const Timeline = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

const Milestone = ({
  milestone,
  last,
}: {
  milestone: Milestone;
  last?: boolean;
}) => {
  return (
    <div className="flex gap-x-4 mb-2">
      <div className="flex flex-col items-center gap-y-2">
        <div
          className="w-7 h-7 flex justify-center items-center rounded-full text-white"
          style={{
            backgroundColor: EncounterTypeColors[milestone.encounterType],
          }}>
          <LuLandmark size={16} />
        </div>
        {!last && <div className="w-0.5 bg-slate-200 flex-1" />}
      </div>

      <div className="w-80 border border-slate-200 rounded-lg px-4 py-3 mb-5 cursor-pointer hover:ring-4 hover:ring-slate-200 hover:bg-slate-50 transition-all">
        <p className="mb-1 font-medium">{milestone.institution}</p>
        <div className="flex items-center text-xs gap-x-2 mb-1">
          <div className="flex items-center gap-x-0.5 text-slate-500">
            <p>{milestone.date},</p>
            <p>{milestone.time}</p>
          </div>
          <div
            className="w-1.5 aspect-square rounded-full -translate-y-[0.7px]"
            style={{
              backgroundColor: EncounterTypeColors[milestone.encounterType],
            }}
          />
          <div className="flex items-center gap-x-0.5">
            <p className="-translate-y-[0.7px]">Type</p>
            <LuChevronRight />
            <p className="text-slate-500">{milestone.encounterType}</p>
          </div>
        </div>
        <p className="font-mono">#{milestone.id}</p>
      </div>
    </div>
  );
};

Timeline.Milestone = Milestone;