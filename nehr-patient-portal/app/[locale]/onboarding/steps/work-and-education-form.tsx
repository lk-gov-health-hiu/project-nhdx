"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingContext } from "../page";

const formSchema = z.object({
  occupation: z.string().min(2).max(50),
  highestEducationLevel: z.enum(["OL", "AL", "BSc", "MSc", "PHD", "other"]),
});

type formState = z.infer<typeof formSchema>;

export const WorkAndEducationForm = () => {
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

    setOnboardingStep(6);
  };

  return (
    <div className="divide-y">
      <form className="pb-12" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl tracking-tight mb-7">
          Work & Education
        </p>
        <div className="space-y-2 mb-4">
          <label htmlFor="occupation" className="text-sm font-bold">
            Occupation
          </label>
          <Input
            autoFocus
            type="text"
            id="occupation"
            placeholder="Eg: Construction Worker"
            {...register("occupation")}
          />
        </div>
        <div className="space-y-2 mb-4">
          <label htmlFor="highestEducationLevel" className="text-sm font-bold">
            Highest Education Level
          </label>
          <Controller
            control={control}
            name="highestEducationLevel"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger tabIndex={0} ref={field.ref}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OL">OL</SelectItem>
                  <SelectItem value="AL">AL</SelectItem>
                  <SelectItem value="BSc">BSc</SelectItem>
                  <SelectItem value="MSc">MSc</SelectItem>
                  <SelectItem value="PHD">PHD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Button className="space-x-2" type="submit">
          <span>Continue</span>
          <ChevronRight size={18} />
        </Button>
      </form>
    </div>
  );
};
