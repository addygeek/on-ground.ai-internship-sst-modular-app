import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptDisplayProps {
  transcript: string;
  className?: string;
}

export const TranscriptDisplay = ({ transcript, className }: TranscriptDisplayProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "w-full h-[450px] p-8 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 overflow-y-auto shadow-xl",
        "scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent hover:scrollbar-thumb-primary/50",
        "transition-all duration-300",
        className
      )}
    >
      {transcript ? (
        <p className="text-foreground/90 font-mono text-base leading-relaxed whitespace-pre-wrap selection:bg-primary/30 selection:text-primary-foreground">
          {transcript}
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
            <Mic className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground text-center">
            Transcript will appear here in real-time...
          </p>
        </div>
      )}
    </div>
  );
};
