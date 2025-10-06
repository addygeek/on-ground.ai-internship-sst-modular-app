import { useState, useCallback, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TranscriptionStatus } from "@/components/StatusIndicator";

interface WebSocketMessage {
  status?: TranscriptionStatus;
  text?: string;
  timestamp?: string;
}

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<TranscriptionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setIsConnected(true);
        toast({
          title: "Connected",
          description: "Successfully connected to backend",
        });
      };

      ws.current.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          
          if (data.status) {
            setStatus(data.status);
          }
          
          if (data.text) {
            setTranscript((prev) => prev + " " + data.text);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to backend",
          variant: "destructive",
        });
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        toast({
          title: "Disconnected",
          description: "Connection to backend closed",
        });
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      toast({
        title: "Error",
        description: "Failed to create WebSocket connection",
        variant: "destructive",
      });
    }
  }, [url, toast]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    status,
    transcript,
    setTranscript,
    connect,
    disconnect,
    sendMessage,
  };
};