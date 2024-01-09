import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ReactNode } from "react";

export interface OverviewCardProps {
  title: string;
  value: string;
  lastMonthValue?: string;
  icon?: ReactNode;
}

export const OverviewCard = ({
  title,
  value,
  lastMonthValue,
  icon,
}: OverviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex flex-col items-start">
        <div className="text-2xl font-bold">{value}</div>
        {lastMonthValue && (
          <p className="text-xs text-muted-foreground">
            {lastMonthValue} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};
