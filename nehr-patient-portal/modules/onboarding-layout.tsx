import React from "react";
import { ReactNode } from "react";

export const OnboardingLayout = (props: { children: ReactNode }) => {
  const findChild = useNamedBlocks(props.children);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-slate-900 text-slate-50 flex justify-center items-center">
        <div className="max-w-sm">{findChild(LeftSlice)}</div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm w-full">{findChild(RightSlice)}</div>
      </div>
    </div>
  );
};

const LeftSlice = ({ children }: { children: ReactNode }) => children;
const RightSlice = ({ children }: { children: ReactNode }) => children;
OnboardingLayout.Left = LeftSlice;
OnboardingLayout.Right = RightSlice;

const useNamedBlocks = function (children: any) {
  const arr = React.Children.toArray(children);
  return function (Compoponent: any) {
    return arr.find((child: any) => child.type.name === Compoponent.name);
  };
};
