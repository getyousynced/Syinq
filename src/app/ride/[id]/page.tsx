import { redirect } from "next/navigation";

export default function RideIdRedirect() {
  // Keep old /ride/:id links working without relying on any ride id in the web UI.
  redirect("/ride?src=share");
}
