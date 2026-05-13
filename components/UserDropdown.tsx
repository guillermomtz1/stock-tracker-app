"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/sign-in");
  };
  const user = { name: "John Doe", email: "john.doe@example.com" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-md px-2 py-1.5 text-gray-400 hover:text-yellow-500 transition-colors bg-transparent border-none cursor-pointer">
        <Avatar className="h-8 w-8">
          {/* <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" /> */}
          <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:flex flex-col items-start">
          <span className="text-base font-medium text-gray-400">
            {user.name}
          </span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-gray-400 w-auto px-3">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex relative items-center gap-3 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" />
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-400">
                  {user.name}
                </span>
                <div>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2 hidden sm:block" />
          Sign Out
        </DropdownMenuItem>

        <DropdownMenuSeparator className="hidden sm:block bg-gray-600 my-2" />
        <nav className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
