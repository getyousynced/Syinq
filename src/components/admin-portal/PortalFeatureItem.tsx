import type { PortalFeature } from "@/components/admin-portal/types";

export default function PortalFeatureItem({ feature }: { feature: PortalFeature }) {
  const Icon = feature.icon;

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
        <p className="max-w-sm text-sm leading-6 text-white/60">{feature.description}</p>
      </div>
    </div>
  );
}
