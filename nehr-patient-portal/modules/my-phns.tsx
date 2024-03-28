import { DataTable } from "@/components/data-table";
import { Status, StatusType } from "@/components/status";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { FAQ } from "./faq";

export const MyPHNs = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Button>
          <PlusIcon size={20} />
          Generate New PHN
        </Button>
      </div>
      <h1 className="text-xl font-bold mb-5">Claim My PHNs</h1>
      <DataTable columns={columns} data={claims} />
      <FAQ className="mt-12" />
    </div>
  );
};

export type Claim = {
  phn: string;
  organization: string;
  status: StatusType;
};

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "phn",
    header: "PHN",
    cell: ({ row }) => {
      const phn = row.getValue("phn");
      return `#${phn}`;
    },
  },
  {
    accessorKey: "organization",
    header: "ORGANIZATION",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const type = row.original.status;
      return <Status type={type} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "pending")
        return (
          <Button className="w-[90px]" size="sm">
            Claim
          </Button>
        );
      if (status === "declined")
        return (
          <Button className="w-[90px]" size="sm">
            Reclaim
          </Button>
        );
      if (status === "conflicted")
        return (
          <Button className="w-[90px]" size="sm">
            Claim
          </Button>
        );
      if (status === "approved")
        return (
          <Button className="w-[90px]" size="sm" variant="destructive">
            Delink
          </Button>
        );
    },
  },
];

export const claims: Claim[] = [
  {
    phn: "334422",
    organization: "National hospital of Sri Lanka",
    status: "pending",
  },
  {
    phn: "245563",
    organization: "General hospital, Colombo",
    status: "approved",
  },
  {
    phn: "245563",
    organization: "Asiri Surgical Hospital, Narahenpita",
    status: "declined",
  },
];
