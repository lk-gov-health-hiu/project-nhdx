"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useOnboardingContext } from "../page";

const formSchema = z.object({
  NIC: z.string().min(10).max(12),
  passportNo: z.string().optional(),
  drivingLicenseNo: z.string().optional(),
  seniorCitizenNo: z.string().optional(),
});

type formState = z.infer<typeof formSchema>;

export const IdentifiersForm = () => {
  const { onboardingFormData, setOnboardingFormData, setOnboardingStep } =
    useOnboardingContext();
  const { register, handleSubmit } = useForm<formState>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: formState) => {
    setOnboardingFormData({
      ...onboardingFormData,
      ...values,
    });

    setOnboardingStep(4);
  };

  return (
    <div className="divide-y">
      <form className="pb-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl tracking-tight">Identifiers</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nic" className="text-sm font-bold">
              National Id
            </label>
            <Input
              autoFocus
              type="text"
              id="nic"
              placeholder="Eg: 199523456788"
              {...register("NIC")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="passportNo" className="text-sm font-bold">
              Passport
            </label>
            <Input
              type="text"
              id="passportNo"
              placeholder="Eg: 199523456788"
              {...register("passportNo")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="drivingLicenseNo" className="text-sm font-bold">
              Driving License
            </label>
            <Input
              type="text"
              id="drivingLicenseNo"
              placeholder="Eg: 199523456788"
              {...register("drivingLicenseNo")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="seniorCitizenNo" className="text-sm font-bold">
              Senior Citizen No
            </label>
            <Input
              type="text"
              id="seniorCitizenNo"
              placeholder="Eg: 199523456788"
              {...register("seniorCitizenNo")}
            />
          </div>
        </div>

        <Button className="space-x-2" type="submit">
          <span>Continue</span>
          <ChevronRight size={18} />
        </Button>
      </form>
    </div>
  );
};
