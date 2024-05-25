"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  function increase() {
    setAmount(amount + 1);
  }

  function descrease() {
    if (amount > 0) setAmount(amount - 1);
  }
  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        disabled={amount <= 0}
        onClick={descrease}
        variant={"outline"}
        size={"icon"}
        type="button"
      >
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <span className="h-6 w-6 select-none text-center text-xl font-bold">
        {amount}
      </span>
      <Button
        onClick={increase}
        variant={"outline"}
        size={"icon"}
        type="button"
      >
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
