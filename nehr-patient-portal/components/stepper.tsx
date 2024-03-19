import { cn } from "@/lib/utils";

export const Stepper = ({
  stepCount,
  activeStep,
  className,
}: {
  stepCount: number;
  activeStep: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-x-2.5", className)}>
      {Array.from({ length: stepCount }).map((_, idx) => (
        <Step
          key={idx}
          index={idx + 1}
          isDone={idx + 1 < activeStep}
          isCurrent={idx + 1 === activeStep}
        />
      ))}
    </div>
  );
};

const Step = ({
  index,
  isDone,
  isCurrent,
}: {
  index: number;
  isDone: boolean;
  isCurrent: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-12 w-12 rounded-full flex justify-center items-center border text-white opacity-30",
        isDone && "bg-blue-500 border-blue-500 opacity-100",
        isCurrent && "opacity-100"
      )}>
      <span>{index}</span>
    </div>
  );
};
