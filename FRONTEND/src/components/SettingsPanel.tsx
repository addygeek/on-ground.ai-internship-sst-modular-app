import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface SettingsPanelProps {
  wakeWord: string;
  sleepWord: string;
  onWakeWordChange: (value: string) => void;
  onSleepWordChange: (value: string) => void;
}

export const SettingsPanel = ({
  wakeWord,
  sleepWord,
  onWakeWordChange,
  onSleepWordChange,
}: SettingsPanelProps) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold">Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="wake-word" className="text-sm font-medium">Wake Word</Label>
          <Input
            id="wake-word"
            value={wakeWord}
            onChange={(e) => onWakeWordChange(e.target.value)}
            placeholder="e.g., Hi"
            className="bg-background/50 border-border/50 focus:border-primary transition-all h-11 rounded-xl"
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="sleep-word" className="text-sm font-medium">Sleep Word</Label>
          <Input
            id="sleep-word"
            value={sleepWord}
            onChange={(e) => onSleepWordChange(e.target.value)}
            placeholder="e.g., Bye"
            className="bg-background/50 border-border/50 focus:border-primary transition-all h-11 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
