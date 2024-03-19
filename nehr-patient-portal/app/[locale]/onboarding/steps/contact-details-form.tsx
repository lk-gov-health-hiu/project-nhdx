"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { phoneRegex } from "@/lib/utils";
import { useOnboardingContext } from "../page";

const formSchema = z.object({
  phone: z.string().regex(phoneRegex).min(10),
  email: z.string().email(),
  address: z.string().min(2).max(200),
  gramaNiladariDivision: z.string().min(2).max(50),
});

type formState = z.infer<typeof formSchema>;

export const ContactDetailsForm = () => {
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

    setOnboardingStep(5);
  };

  return (
    <div className="divide-y">
      <form className="pb-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl tracking-tight">Contact Details</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold">
              Phone
            </label>
            <Input
              autoFocus
              type="text"
              id="phone"
              placeholder="Eg: 0713456789"
              {...register("phone")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Eg: yourmail@mail.com"
              {...register("email")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-bold">
              Resident Address
            </label>
            <Input
              type="text"
              id="address"
              placeholder="Eg: 123 Rd, Colombo"
              {...register("address")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="gramaNiladariDivision"
              className="text-sm font-bold">
              Grama Niladari Division
            </label>
            <Input
              type="text"
              id="gramaNiladariDivision"
              placeholder="Eg: Pettah"
              {...register("gramaNiladariDivision")}
            />
          </div>
        </div>

        <Button className="space-x-2">
          <span>Continue</span>
          <ChevronRight size={18} />
        </Button>
      </form>
    </div>
  );
};
