import { FC } from "react";
import { Separator } from "./ui/separator";

export interface TitleSeparatorProps {
  title: string;
}

export const TitleSeparator: FC<TitleSeparatorProps> = ({ title }) => {
  return (
    <div className="self-stretch flex items-center justify-between gap-3 mt-9 max-md:max-w-full max-md:flex-wrap">
      <div className="text-black text-xl font-extrabold leading-7 tracking-normal grow whitespace-nowrap">
        {title}
      </div>
      <div className="w-full max-md:hidden">
        <Separator />
      </div>
    </div>
  );
};
