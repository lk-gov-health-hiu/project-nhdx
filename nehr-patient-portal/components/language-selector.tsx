"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

export const LanguageSelector = () => {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const handleChange = (newLocale: "en" | "si" | "ta") =>
    changeLocale(newLocale);

  return (
    <Select
      defaultValue="en"
      onValueChange={handleChange}
      value={currentLocale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="si">සිංහල</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ta">தமிழ்</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
