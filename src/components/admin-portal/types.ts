import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

export type PortalFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PortalField = {
  id: string;
  name: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  helper?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  allowToggle?: boolean;
};
