"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { NavbarLinks } from "@/components/navbar-links";
import { LanguageSelector } from "@/components/language-selector";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { UserSignOut } from "@/components/user-sign-out";
import { AvatarMenu } from "@/modules/avatar-menu";
import { Suspense } from "react";
import { MenuIcon } from "lucide-react";

export const NavBar = () => {
  const { status } = useSession();

  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
      <header className="flex h-20 w-full items-center max-w-6xl mx-auto px-4">
        <Link className="mr-6 flex items-center" href="/">
          <span className="text-3xl font-bold">NEHR</span>
        </Link>
        <div className="hidden md:flex items-center ml-auto gap-6 text-slate-500 text-base">
          <NavbarLinks />
          <Suspense>
            <LanguageSelector />
          </Suspense>
          {status === "authenticated" && <AvatarMenu />}
        </div>
        <div className="flex md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-2 py-6 text-slate-500 text-base">
                <UserSignOut />
                <NavbarLinks />
                <Suspense>
                  <LanguageSelector />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <Separator />
    </motion.div>
  );
};
