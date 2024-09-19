"use client";
import { Button } from "@/components/ui/button";

import DialogStatus from "./dialog-filter-status";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Props {
  priority: string;
  percentComplete: string;
}

export function FilterList({ percentComplete, priority }: Props) {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant="outline"
          className="gap-4 w-[140px] rounded-full border border-[#788089] items-center text-center"
        >
          <ListFilter className="h-4 w-4" />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild onClick={handleItemClick}>
          <DialogStatus priority={priority} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <DialogStatusAircraft
            aircrafts={aircrafts}
            status={status}
            userId={userId}
            page={page}
            perPage={perPage}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DialogFilterUsers
            aircraftId={aircraftId}
            userId={userId}
            status={status}
            searchUser={searchUser}
            perPage={perPage}
            Users={Users}
          />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
