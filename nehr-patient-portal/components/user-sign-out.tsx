import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const UserSignOut = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={() => signOut()}>
            <LogOutIcon />
            <span className="sr-only">sign out</span>
            <TooltipContent>Sign Out</TooltipContent>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
