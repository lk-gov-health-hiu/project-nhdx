"use client";

import Link from "next/link";
import Barcode from "react-barcode";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useOnboardingContext } from "../page";

export const PHNCard = () => {
  const { onboardingFormData } = useOnboardingContext();
  console.log(onboardingFormData);

  return (
    <div className="divide-y">
      <div className="pb-12">
        <p className="bg-slate-900 inline-block px-3 py-px rounded-lg mb-2">
          <span className="text-slate-100 font-bold">
            #{onboardingFormData.phn ?? "nothing"}
          </span>
        </p>
        <p className="font-bold text-3xl tracking-tight mb-2">Your PHN Card</p>
        <p className="text-slate-500">
          Explain what the PHN is and how it is used for, and some info about
          the artwork.
        </p>
        <div className="-translate-x-[11px] py-4">
          <Barcode
            value={`PHN ---- #${onboardingFormData.phn}`}
            textAlign="right"
            fontSize={14}
          />
        </div>
        <Button className="space-x-2" asChild>
          <Link href="/dashboard">
            <span>Go to dashboard</span>
            <ChevronRight size={18} />
          </Link>
        </Button>
      </div>
    </div>
  );
};
