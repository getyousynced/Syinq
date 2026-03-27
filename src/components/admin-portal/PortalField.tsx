import type { ChangeEventHandler } from "react";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import type { PortalField as PortalFieldType } from "@/components/admin-portal/types";

type Props = {
  field: PortalFieldType;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

export default function PortalField({
  field,
  value,
  onChange,
  showPassword = false,
  onTogglePassword,
}: Props) {
  const Icon = field.type === "email" ? AtSign : Lock;
  const inputType =
    field.type === "password" && field.allowToggle
      ? showPassword
        ? "text"
        : "password"
      : field.type;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={field.id} className="text-sm font-semibold text-slate-700">
          {field.label}
        </label>
        {field.helper ? (
          <span className="text-xs font-semibold text-[#3f73ea]">{field.helper}</span>
        ) : null}
      </div>
      <div className="flex h-14 items-center gap-3 rounded-full border border-slate-200 bg-[#eef0f8] px-5 transition focus-within:border-[#3568da]/30 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(53,104,218,0.08)]">
        <Icon className="h-[18px] w-[18px] text-slate-500" />
        <input
          id={field.id}
          name={field.name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className="h-full w-full bg-transparent text-sm font-medium tracking-[0.01em] text-slate-700 outline-none placeholder:text-slate-400"
        />
        {field.type === "password" && field.allowToggle ? (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff className="h-[18px] w-[18px]" />
            ) : (
              <Eye className="h-[18px] w-[18px]" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
