"use client";

import { cn } from "@/lib/utils";
import { LandmarkIcon } from "lucide-react";
import { ReactNode } from "react";

type Encounter = {
  name: string;
  color: string;
};

export type Milestone = {
  id: string;
  institution: string;
  date: string;
  time: string;
  encounter: Encounter;
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
            backgroundColor: milestone.encounter.color,
          }}>
          <LandmarkIcon size={16} />
        </div>
        {!last && <div className="w-px bg-slate-200 flex-1" />}
      </div>

      <div
        className={cn(
          "w-full border border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:border-slate-300/80 hover:bg-slate-100 transition-all",
          !last && "mb-2 lg:mb-5"
        )}>
        <p className="mb-1 font-medium">{milestone.institution}</p>
        <div className="flex items-center text-sm gap-x-2 mb-1">
          <div className="flex items-center gap-x-0.5 text-slate-600">
            <p>{milestone.date},</p>
            <p>{milestone.time}</p>
          </div>
          <div
            className="w-1.5 aspect-square rounded-full -translate-y-[0.7px]"
            style={{
              backgroundColor: milestone.encounter.color,
            }}
          />
          <div className="flex items-center gap-x-0.5">
            <p className="text-slate-600">{milestone.encounter.name}</p>
          </div>
        </div>
        <p className="text-sm text-slate-600">#{milestone.id}</p>
      </div>
    </div>
  );
};

Timeline.Milestone = Milestone;
