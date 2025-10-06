import { useState } from "react";
import { Card } from "@/components/ui/card";
import { StatusIndicator } from "@/components/StatusIndicator";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { ControlPanel } from "@/components/ControlPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useWebSocket } from "@/hooks/useWebSocket";

const Index = () => {
  const [wakeWord, setWakeWord] = useState("Hi");
  const [sleepWord, setSleepWord] = useState("Bye");
  
  // WebSocket connection - replace with your backend URL
  const WS_URL = "ws://localhost:8000/ws"; // Update this with your Python backend URL
  
  const {
    isConnected,
    status,
    transcript,
    setTranscript,
    connect,
    sendMessage,
  } = useWebSocket(WS_URL);

  const handleForceStart = () => {
    sendMessage({ action: "force_start" });
  };

  const handleForceStop = () => {
    sendMessage({ action: "force_stop" });
  };

  const handleClear = () => {
    setTranscript("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Header */}
        <header className="text-center space-y-4 py-12">
          <h1 className="text-6xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-scale-in drop-shadow-lg">
            Wake-Sleep Real-Time STT
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Activated by "<span className="text-[hsl(var(--status-active))] font-semibold px-2 py-1 bg-[hsl(var(--status-active))]/10 rounded-lg">{wakeWord}</span>", 
            Stopped by "<span className="text-[hsl(var(--status-stopped))] font-semibold px-2 py-1 bg-[hsl(var(--status-stopped))]/10 rounded-lg">{sleepWord}</span>"
          </p>
        </header>

        {/* Status Indicator */}
        <div className="animate-slide-in-right">
          <StatusIndicator status={status} />
        </div>

        {/* Settings Panel */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <SettingsPanel
            wakeWord={wakeWord}
            sleepWord={sleepWord}
            onWakeWordChange={setWakeWord}
            onSleepWordChange={setSleepWord}
          />
        </div>

        {/* Transcript Display */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-heading font-semibold">Live Transcript</h2>
          <TranscriptDisplay transcript={transcript} />
        </div>

        {/* Control Panel */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ControlPanel
            isConnected={isConnected}
            onConnect={connect}
            onForceStart={handleForceStart}
            onForceStop={handleForceStop}
            onClear={handleClear}
          />
        </div>

        {/* Connection Info */}
        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50 border-dashed shadow-xl animate-fade-in backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-idle))] animate-pulse shadow-lg shadow-[hsl(var(--status-idle))]/50" />
            Backend Configuration
          </h3>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              WebSocket URL: <code className="text-primary bg-primary/10 px-2 py-1 rounded">{WS_URL}</code>
            </p>
            {!isConnected && (
              <div className="flex items-center gap-2 text-[hsl(var(--status-idle))] mt-3 p-3 bg-[hsl(var(--status-idle))]/10 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-idle))] animate-pulse" />
                <span>Not connected to backend. Click "Connect to Backend" to start.</span>
              </div>
            )}
            {isConnected && (
              <div className="flex items-center gap-2 text-[hsl(var(--status-active))] mt-3 p-3 bg-[hsl(var(--status-active))]/10 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-active))] animate-pulse" />
                <span>Connected and ready!</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
