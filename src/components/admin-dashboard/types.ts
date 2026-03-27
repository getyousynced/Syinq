import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  meta?: string;
  tone?: "blue" | "green" | "dark";
};

export type DashboardEvent = {
  title: string;
  description: string;
  time: string;
  tone: "green" | "orange" | "blue" | "slate";
};
