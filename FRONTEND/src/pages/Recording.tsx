import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          // Here you would send audio chunks to your backend for real-time transcription
          sendAudioToBackend(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Capture in 1-second chunks
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak clearly for best transcription results",
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Transcription complete",
      });
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    // This is where you'd send audio to your Python backend
    // Example implementation:
    /*
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result?.toString().split(',')[1];
      
      // Send to backend via WebSocket or HTTP
      const response = await fetch('YOUR_BACKEND_URL/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: base64Audio })
      });
      
      const data = await response.json();
      if (data.text) {
        setTranscript(prev => prev + ' ' + data.text);
      }
    };
    */
    
    // Simulated transcription for demo
    const simulatedTexts = [
      "Hello, this is a demonstration of real-time speech-to-text.",
      "The audio is being captured and processed.",
      "You can see the transcript updating live.",
      "This connects to your Python backend for actual transcription.",
    ];
    
    if (isRecording && Math.random() > 0.7) {
      const randomText = simulatedTexts[Math.floor(Math.random() * simulatedTexts.length)];
      setTranscript(prev => prev + (prev ? " " : "") + randomText);
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Transcript saved successfully",
    });
  };

  const clearTranscript = () => {
    setTranscript("");
    toast({
      title: "Cleared",
      description: "Transcript cleared",
    });
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-6xl md:text-7xl font-heading font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-scale-in drop-shadow-lg">
            Live Audio Recording
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time speech-to-text transcription with audio visualization
          </p>
        </div>

        {/* Recording Status Card */}
        <Card className="p-8 bg-gradient-to-br from-card via-card to-card/80 border-border/50 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full transition-all duration-300 shadow-lg",
                    isRecording
                      ? "bg-[hsl(var(--status-stopped))]"
                      : "bg-[hsl(var(--status-idle))]"
                  )}
                  style={{
                    boxShadow: isRecording 
                      ? "0 0 20px hsl(var(--status-stopped))" 
                      : "0 0 10px hsl(var(--status-idle))"
                  }}
                />
                {isRecording && (
                  <>
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-[hsl(var(--status-stopped))] animate-ping opacity-75" />
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-[hsl(var(--status-stopped))] animate-pulse opacity-50" />
                  </>
                )}
              </div>
              <span className={cn(
                "text-xl font-heading font-semibold",
                isRecording ? "text-[hsl(var(--status-stopped))]" : "text-[hsl(var(--status-idle))]"
              )}>
                {isRecording ? "Recording..." : "Ready to Record"}
              </span>
            </div>
            
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className="gap-2 min-w-[160px] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Start
                </>
              )}
            </Button>
          </div>

          {/* Audio Visualizer */}
          <div className="h-36 bg-background/50 rounded-xl p-6 border border-border/50 shadow-inner">
            <AudioVisualizer isRecording={isRecording} />
          </div>
        </Card>

        {/* Transcript Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold">Live Transcript</h2>
            <div className="flex gap-2">
              <Button
                onClick={downloadTranscript}
                variant="outline"
                size="sm"
                disabled={!transcript}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={clearTranscript}
                variant="outline"
                size="sm"
                disabled={!transcript}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
          
          <TranscriptDisplay 
            transcript={transcript} 
            className="animate-fade-in"
          />
        </div>

        {/* Backend Integration Info */}
        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50 border-dashed shadow-xl backdrop-blur-sm">
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-idle))] animate-pulse shadow-lg shadow-[hsl(var(--status-idle))]/50" />
            Backend Integration
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Update the <code className="text-primary">sendAudioToBackend</code> function in Recording.tsx
            </p>
            <p>
              • Connect to your Python WebSocket/HTTP endpoint for real-time transcription
            </p>
            <p>
              • Audio is captured in 24kHz, mono, PCM format for optimal quality
            </p>
            <p>
              • Currently showing simulated transcription - replace with actual backend calls
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Recording;
