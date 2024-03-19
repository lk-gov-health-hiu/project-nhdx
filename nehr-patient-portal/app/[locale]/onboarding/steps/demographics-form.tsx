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
  name: z.string().min(2).max(50),
  gender: z.enum(["male", "female", "n/a"]),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  dateOfBirth: z.preprocess((args) => args ?? undefined, z.coerce.date()),
  nationality: z.enum(["sri-lankan", "other"]),
});

type formState = z.infer<typeof formSchema>;

export const DemographicsForm = () => {
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

    setOnboardingStep(3);
  };

  return (
    <div className="divide-y">
      <form className="pb-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl tracking-tight">Demographics</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold">
              Name
            </label>
            <Input
              autoFocus
              type="text"
              id="name"
              placeholder="Eg: John Doe"
              {...register("name")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-bold">
              Gender
            </label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger tabIndex={0} ref={field.ref}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="n/a">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="marital-status" className="text-sm font-bold">
              Marital Status
            </label>
            <Controller
              control={control}
              name="maritalStatus"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger tabIndex={0} ref={field.ref}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dob" className="text-sm font-bold">
              Date of Birth
            </label>
            <Input
              type="date"
              id="dob"
              placeholder="Select"
              {...register("dateOfBirth")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nationality" className="text-sm font-bold">
              Nationality
            </label>
            <Controller
              control={control}
              name="nationality"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger tabIndex={0} ref={field.ref}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sri-lankan">Sri Lankan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
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
