import { FileQuestion } from "lucide-react";

import StatusShell from "./StatusShell";

export default function NotFoundState() {
  return (
    <StatusShell
      icon={FileQuestion}
      tone="slate"
      title="Report not found"
      message="This report does not exist, or it belongs to another account."
    />
  );
}
