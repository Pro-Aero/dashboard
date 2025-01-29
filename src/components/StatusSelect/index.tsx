"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "All" | "NextOverdue" | "Overdue" | "InProgress";

export function StatusSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = (searchParams.get("status") as Status) || "All";

  const handleStatusChange = (value: Status) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleStatusChange} value={currentStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">Todos</SelectItem>
        <SelectItem value="Overdue">Atrasadas</SelectItem>
        <SelectItem value="NextOverdue">Próximo de vencer</SelectItem>
        <SelectItem value="InProgress">Em progresso</SelectItem>
        <SelectItem value="NotStarted">Não iniciado</SelectItem>
      </SelectContent>
    </Select>
  );
}
