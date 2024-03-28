import Link from "next/link";
import { PageParams } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DemographicsForm } from "./sections/demographics";

const SectionLink = ({
  children,
  href,
  isActive,
}: {
  children: ReactNode;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link
      replace
      className={cn(
        "transition-all",
        isActive
          ? "text-blue-500 hover:text-blue-500 scale-100"
          : "text-slate-50 hover:text-slate-300 scale-95"
      )}
      href={`?section=${href}`}>
      {children}
    </Link>
  );
};

export default function SettingsPage(props: PageParams) {
  if (!props.searchParams.section) throw new Error("Missing param: `section`");
  if (Array.isArray(props.searchParams.section))
    throw new Error("Invalid param: `section`");

  const { section } = props.searchParams;

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-2/5 bg-slate-900 text-slate-50 flex flex-col justify-center items-end pr-8 gap-y-2">
          <SectionLink isActive={section === "my-phn"} href="my-phn">
            My PHN
          </SectionLink>
          <SectionLink
            isActive={section === "demographics"}
            href="demographics">
            Demographics
          </SectionLink>
          <SectionLink isActive={section === "identifiers"} href="identifiers">
            Personal Identifiers
          </SectionLink>
          <SectionLink
            isActive={section === "contact-details"}
            href="contact-details">
            Contact Info
          </SectionLink>
          <SectionLink
            isActive={section === "work-and-education"}
            href="work-and-education">
            Work & Education
          </SectionLink>
          <SectionLink
            isActive={section === "emergency-contact"}
            href="emergency-contact">
            Emergency Contact
          </SectionLink>
          <SectionLink
            isActive={section === "dependent-profiles"}
            href="dependent-profiles">
            Dependent Profiles
          </SectionLink>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-96">
            {steps[props.searchParams.section as "demographics"]}
          </div>
        </div>
      </div>
    </>
  );
}

const steps = {
  // 1: <PHNForm />,
  demographics: <DemographicsForm />,
  // 3: <IdentifiersForm />,
  // 4: <ContactDetailsForm />,
  // 5: <WorkAndEducationForm />,
  // 6: <EmergencyContactForm />,
  // 7: <PHNCard />,
};
