import { cn } from "@/lib/utils";

export type TranscriptionStatus = "idle" | "transcribing" | "stopped";

interface StatusIndicatorProps {
  status: TranscriptionStatus;
}

const statusConfig = {
  idle: {
    label: "Listening for wake word...",
    dotClass: "bg-[hsl(var(--status-idle))]",
    textClass: "text-[hsl(var(--status-idle))]",
  },
  transcribing: {
    label: "Transcribing...",
    dotClass: "bg-[hsl(var(--status-active))]",
    textClass: "text-[hsl(var(--status-active))]",
  },
  stopped: {
    label: "Stopped",
    dotClass: "bg-[hsl(var(--status-stopped))]",
    textClass: "text-[hsl(var(--status-stopped))]",
  },
};

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const config = statusConfig[status];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="relative flex items-center gap-4 p-6">
        <div className="relative">
          <div
            className={cn(
              "w-5 h-5 rounded-full transition-all duration-300 shadow-lg",
              config.dotClass
            )}
            style={{
              boxShadow: status === "transcribing" 
                ? "0 0 20px currentColor" 
                : "0 0 10px currentColor"
            }}
          />
          {status === "transcribing" && (
            <>
              <div className={cn("absolute inset-0 w-5 h-5 rounded-full animate-ping opacity-75", config.dotClass)} />
              <div className={cn("absolute inset-0 w-5 h-5 rounded-full animate-pulse opacity-50", config.dotClass)} />
            </>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Status
          </span>
          <span className={cn("text-lg font-heading font-semibold", config.textClass)}>
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
};
