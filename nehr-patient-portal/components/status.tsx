export type StatusType = "pending" | "approved" | "declined" | "conflicted";

enum Colors {
  pending = "#EAB308",
  approved = "#10B981",
  declined = "#EF4444",
  conflicted = "#EF4444",
}

export const Status = ({ type }: { type: StatusType }) => {
  return (
    <span
      className="uppercase inline-block text-[13px] font-medium text-slate-50 px-3 py-0.5 rounded-md"
      style={{
        backgroundColor: Colors[type],
      }}>
      {type}
    </span>
  );
};
