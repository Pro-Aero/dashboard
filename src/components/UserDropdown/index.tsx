"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserResponse } from "@/services/users";

interface Props {
  listUsers: UserResponse[];
  employee: string;
}

export function SelectUser({ listUsers, employee }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedName, setSelectedName] = useState<string>("");

  useEffect(() => {
    const currentEmployee = searchParams.get("employee");
    if (currentEmployee) {
      const selectedUser = listUsers.find(
        (user) => user.id === currentEmployee
      );
      if (selectedUser) {
        setSelectedName(selectedUser.displayName);
      }
    }
  }, [listUsers, searchParams]);

  const handleSelectChange = (selectedValue: string) => {
    const selectedItem = listUsers.find((item) => item.id === selectedValue);
    if (selectedItem) {
      setSelectedName(selectedItem.displayName);
      router.push(`?employee=${selectedValue}`);
    }
  };

  return (
    <Select onValueChange={handleSelectChange} value={employee}>
      <SelectTrigger className="w-[300px] rounded-md border border-[#788089] gap-1">
        <SelectValue placeholder="Selecione um funcionário">
          {selectedName || "Selecione um funcionário"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Funcionário</SelectLabel>
          {listUsers &&
            listUsers.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.displayName}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
