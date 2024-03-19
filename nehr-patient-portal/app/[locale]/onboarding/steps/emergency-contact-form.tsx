"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { phoneRegex } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingContext } from "../page";

const formSchema = z.object({
  emergencyContactName: z.string().min(2).max(50),
  emergencyContactAddress: z.string().min(2).max(200),
  emergencyContactPhone: z.string().regex(phoneRegex).min(10),
  emergencyContactRelationship: z.enum([
    "father",
    "mother",
    "sibling",
    "spouse",
    "other",
  ]),
});

type formState = z.infer<typeof formSchema>;

export const EmergencyContactForm = () => {
  const { onboardingFormData, setOnboardingFormData, setOnboardingStep } =
    useOnboardingContext();
  const { register, handleSubmit, control } = useForm<formState>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: formState) => {
    setOnboardingFormData({
      ...onboardingFormData,
      ...values,
    });

    setOnboardingStep(7);
  };

  return (
    <div className="divide-y">
      <form className="pb-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl tracking-tight mb-7">
          Emergency Contact
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="emergencyContactName" className="text-sm font-bold">
              Name
            </label>
            <Input
              autoFocus
              type="text"
              id="emergencyContactName"
              placeholder="Eg: John Doe"
              {...register("emergencyContactName")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="emergencyContactAddress"
              className="text-sm font-bold">
              Address
            </label>
            <Input
              type="text"
              id="emergencyContactAddress"
              placeholder="Eg: 123 Rd, Colombo"
              {...register("emergencyContactAddress")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="emergencyContactPhone"
              className="text-sm font-bold">
              Phone
            </label>
            <Input
              type="text"
              id="emergencyContactPhone"
              placeholder="Eg: 0713456789"
              {...register("emergencyContactPhone")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="emergencyContactRelationship"
              className="text-sm font-bold">
              Relationship
            </label>
            <Controller
              control={control}
              name="emergencyContactRelationship"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger tabIndex={0} ref={field.ref}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <Button className="space-x-2" type="submit">
          <span>Finish</span>
          <ChevronRight size={18} />
        </Button>
      </form>
    </div>
  );
};
