import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FAQ } from "./faq";
import { Input } from "@/components/ui/input";

export const PrivacyAndAccess = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Institutions with Read Access</h1>
        <Input className="w-56" placeholder="Search" />
      </div>
      <DataTable
        columns={columns}
        data={institutions.filter((i) => i.status === "granted")}
      />

      <div className="flex justify-between items-center mb-5 mt-16">
        <h1 className="text-xl font-bold">Institutions with Revoked Access</h1>
        <Input className="w-56" placeholder="Search" />
      </div>
      <DataTable
        columns={columns}
        data={institutions.filter((i) => i.status === "revoked")}
      />

      <FAQ className="mt-12" />
    </div>
  );
};

export type Institution = {
  datetime: string;
  institution: string;
  status: "granted" | "revoked";
};

export const columns: ColumnDef<Institution>[] = [
  {
    accessorKey: "datetime",
    header: "DATE & TIME",
  },
  {
    accessorKey: "institution",
    header: "INSTITUTION",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "granted") {
        return (
          <Button className="w-[90px]" size="sm" variant="destructive">
            Revoke
          </Button>
        );
      }

      if (status === "revoked") {
        return (
          <Button className="w-[90px]" size="sm">
            Reinstate
          </Button>
        );
      }
    },
  },
];

export const institutions: Institution[] = [
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "granted",
  },
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "granted",
  },
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "granted",
  },
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "revoked",
  },
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "revoked",
  },
  {
    datetime: "2022-12-19",
    institution: "National hospital of Sri Lanka",
    status: "revoked",
  },
];
