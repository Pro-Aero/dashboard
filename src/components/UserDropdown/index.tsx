"use client";

import * as React from "react";

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
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  listUsers: UserResponse[];
  employee: string;
}

export function SelectUser({ listUsers, employee }: Props) {
  const { replace } = useRouter();
  const [selectedName, setSelectedName] = useState<string>("");

  const handleSelectChange = (selectedValue: string) => {
    const selectedItem = listUsers.find((item) =>
      item.id === employee ? employee : selectedValue
    );
    setSelectedName(selectedItem?.displayName as string);
    replace(`?employee=${selectedValue}`);

    return;
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[300px] rounded-md border border-[#788089] gap-1">
        <SelectValue
          placeholder={selectedName ? selectedName : "Selecione um funcionário"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Funcionário</SelectLabel>
          {listUsers &&
            listUsers.map((item, index) => (
              <SelectItem key={index} value={item.id}>
                {item.displayName}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
