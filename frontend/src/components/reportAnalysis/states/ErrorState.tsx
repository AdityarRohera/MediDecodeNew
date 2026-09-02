import { AlertCircle } from "lucide-react";

import StatusShell from "./StatusShell";

export default function ErrorState({ title }: { title: string }) {
  return (
    <StatusShell
      icon={AlertCircle}
      tone="danger"
      title={title}
      message="We could not load this report right now. Refresh the page, or head back to your reports and open it again."
    />
  );
}
