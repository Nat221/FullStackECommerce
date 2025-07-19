"use client";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { updateOrderStatus } from "./actions";

const statuses = [
  { label: "New", value: "New" },
  { label: "Paid", value: "Paid" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
];

export default function StatusSelector({
  status,
  id,
}: {
  status: string;
  id: number;
}) {
  return (
    <Select
      defaultValue={status}
      onValueChange={(value) => updateOrderStatus(id, value)}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {statuses.map((status) => (
            <SelectItem
              key={status.value}
              label={status.label}
              value={status.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
