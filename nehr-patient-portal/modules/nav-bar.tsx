import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { NavbarLinks } from "@/components/navbar-links";
import { LanguageSelector } from "@/components/language-selector";
import { FaBars } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export const NavBar = () => {
  return (
    <>
      <header className="flex h-20 w-full items-center px-40 max-md:px-4">
        <Link className="mr-6 flex items-center" href="#">
          <span className="text-3xl font-black">NEHR</span>
        </Link>
        <div className="hidden md:flex items-center ml-auto gap-6 text-slate-500 text-base">
          <NavbarLinks />
          <LanguageSelector />
        </div>
        <div className="flex md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <FaBars />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-2 py-6 text-slate-500 text-base">
                <NavbarLinks />
                <LanguageSelector />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <Separator />
    </>
  );
};
