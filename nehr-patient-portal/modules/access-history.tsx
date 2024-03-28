import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FAQ } from "./faq";

export const AccessHistory = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">Portal Access History</h1>
      <DataTable columns={columns} data={history} />
      <ArchivedRecords count={3} />

      <h1 className="text-xl font-bold mb-5 mt-16">Provider Access History</h1>
      <DataTable columns={columns} data={history} />
      <ArchivedRecords count={8} />

      <FAQ className="mt-12" />
    </div>
  );
};

const ArchivedRecords = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-x-2 mt-4">
      <div className="size-8 rounded-full text-white bg-slate-950 flex justify-center items-center">
        <span>{count}</span>
      </div>
      <span className="text-sm font-medium">Archived Records</span>
    </div>
  );
};

export type History = {
  phn: string;
  datetime: string;
  duration: string;
  institution: string;
  provider: string;
};

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "phn",
    header: "PHN",
    cell: ({ row }) => {
      const phn = row.getValue("phn");
      return `#${phn}`;
    },
  },
  {
    accessorKey: "datetime",
    header: "DATE & TIME",
  },
  {
    accessorKey: "duration",
    header: "DURATION",
  },
  {
    accessorKey: "institution",
    header: "INSTITUTION",
  },
  {
    accessorKey: "provider",
    header: "PROVIDER",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button className="w-[90px]" size="sm" variant="destructive">
          Archive
        </Button>
      );
    },
  },
];

export const history: History[] = [
  {
    phn: "334422",
    datetime: "2022-12-19",
    duration: "20 Mins",
    institution: "National hospital of Sri Lanka",
    provider: "Google",
  },
  {
    phn: "334422",
    datetime: "2022-12-21",
    duration: "10 Mins",
    institution: "National hospital of Sri Lanka",
    provider: "Facebook",
  },
  {
    phn: "334422",
    datetime: "2022-12-19",
    duration: "20 Mins",
    institution: "National hospital of Sri Lanka",
    provider: "Google",
  },
];
