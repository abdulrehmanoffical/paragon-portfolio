import React from "react";

interface EmptyServiceStateProps {
  message: string;
}

export default function EmptyServiceState({ message }: EmptyServiceStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 md:py-20 px-6 rounded-2xl border border-dashed border-border bg-surface/40">
      <p className="text-sm text-secondary max-w-sm">{message}</p>
    </div>
  );
}
