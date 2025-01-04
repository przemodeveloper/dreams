import type { Option } from "@/models/form";

export function getLabel(options: Option[], value?: string) {
  return options.find((option) => option.value === value)?.label || "";
}
