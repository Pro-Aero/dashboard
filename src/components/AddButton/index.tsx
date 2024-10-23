"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

import { useState } from "react";

export function AddButton() {
  const [statusForm, setStatusForm] = useState(false);
  return (
    <form>
      <Button
        variant={"default"}
        className="border-0 hover:border-0 bg-[#044AB8] px-10 rounded-2xl text"
      >
        <Plus className="mr-2 size-4" strokeWidth={4} />
        Criar Template
      </Button>
    </form>
  );
}
