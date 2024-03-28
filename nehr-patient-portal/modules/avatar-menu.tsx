"use client";

import Link from "next/link";
import { parseJwt } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useScopedI18n } from "@/locales/client";
import { UsersIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchPatient = async (idToken: string, patientId: string) => {
  const response = await fetch(`${BASE_URL}/fhir/r4/Patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const json = await response.json();
  return json;
};

export const AvatarMenu = () => {
  const t = useScopedI18n("commons");
  const { data: auth } = useSession();
  const patientId = parseJwt(auth?.user?.idToken)?.patientId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatient(auth?.user.idToken!, patientId),
  });

  const name = data?.name?.[0]?.text;
  const firstName = name?.split(" ")?.[0];
  const lastName = name?.split(" ")?.[1];
  const initials = firstName?.[0] + lastName?.[0];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-9 aspect-square rounded-full bg-black text-slate-50 text-sm font-bold tracking-tighter">
          {isLoading || isError || Number.isNaN(initials) ? "..." : initials}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={12}>
          <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings?section=my-phn">{t("settings")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => signOut()}>
            {t("signOut")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UsersIcon size={18} />
              <span className="ml-2 mr-8">{t("switchProfile")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Profile 1</DropdownMenuItem>
                <DropdownMenuItem>Profile 2</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
