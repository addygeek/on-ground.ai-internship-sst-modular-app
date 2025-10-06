import { Button } from "@/components/ui/button";
import { Mic, MicOff, Trash2, Wifi } from "lucide-react";

interface ControlPanelProps {
  isConnected: boolean;
  onConnect: () => void;
  onForceStart: () => void;
  onForceStop: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export const ControlPanel = ({
  isConnected,
  onConnect,
  onForceStart,
  onForceStop,
  onClear,
  disabled,
}: ControlPanelProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={onConnect}
        disabled={isConnected}
        variant={isConnected ? "secondary" : "default"}
        className="gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        <Wifi className="w-4 h-4" />
        {isConnected ? "Connected" : "Connect to Backend"}
      </Button>
      
      <Button
        onClick={onForceStart}
        disabled={!isConnected || disabled}
        variant="outline"
        className="gap-2 border-[hsl(var(--status-active))] text-[hsl(var(--status-active))] hover:bg-[hsl(var(--status-active))]/10 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
      >
        <Mic className="w-4 h-4" />
        Force Start
      </Button>
      
      <Button
        onClick={onForceStop}
        disabled={!isConnected || disabled}
        variant="outline"
        className="gap-2 border-[hsl(var(--status-stopped))] text-[hsl(var(--status-stopped))] hover:bg-[hsl(var(--status-stopped))]/10 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
      >
        <MicOff className="w-4 h-4" />
        Force Stop
      </Button>
      
      <Button
        onClick={onClear}
        variant="outline"
        className="gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
      >
        <Trash2 className="w-4 h-4" />
        Clear Transcript
      </Button>
    </div>
  );
};
