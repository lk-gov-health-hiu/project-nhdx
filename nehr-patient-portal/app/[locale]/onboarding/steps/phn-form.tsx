"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingContext } from "../page";

const formSchema = z.object({
  phn: z.string().length(6),
});

type formState = z.infer<typeof formSchema>;

export const PHNForm = () => {
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

    setOnboardingStep(2);
  };

  return (
    <div className="divide-y">
      <form className="pb-12" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-3xl mb-2 tracking-tight">
          Already have a PHN
        </p>
        <p className="text-slate-500 mb-3">
          Enter your personal healthcare number if you already have one
        </p>
        <Input
          autoFocus
          type="text"
          placeholder="Eg: 123456"
          className="mb-4"
          {...register("phn")}
        />
        <Button type="submit">Continue</Button>
      </form>

      <div className="pt-10">
        <p className="font-bold text-3xl mb-2 tracking-tight">
          Don't have a PHN
        </p>
        <p className="text-slate-500 mb-4">
          If you don't already have a PHN, you can generate one by pressing the
          generate button
        </p>
        <Button className="space-x-2">
          <PlusIcon size={18} />
          <span>Generate New PHN</span>
        </Button>
      </div>
    </div>
  );
};
