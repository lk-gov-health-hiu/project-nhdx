import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { FAQ } from "./faq";

export const MyCommunications = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Button>
          <PlusIcon size={20} />
          Create ticket
        </Button>
      </div>
      <h1 className="text-xl font-bold mb-5">My Tickets</h1>
      <DataTable columns={columns} data={claims} />
      <FAQ className="mt-12" />
    </div>
  );
};

export type Ticket = {
  id: string;
  date: string;
  type: string;
  content: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "TICKET ID",
    cell: ({ row }) => {
      const id = row.original.id;
      return `#${id}`;
    },
  },
  {
    accessorKey: "date",
    header: "DATE",
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <span className="uppercase inline-block text-[13px] font-medium text-slate-50 px-3 py-0.5 rounded-md bg-slate-900">
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "content",
    header: "CONTENT",
  },
];

export const claims: Ticket[] = [
  {
    id: "21",
    date: new Date().toDateString(),
    content: "PHN Claim Request #1234",
    type: "PHN Claim",
  },
  {
    id: "22",
    date: new Date().toDateString(),
    content: "PHN Claim Request #1234",
    type: "PHN Claim",
  },
  {
    id: "24",
    date: new Date().toDateString(),
    content: "PHN Claim Request #1234",
    type: "PHN Claim",
  },
];
