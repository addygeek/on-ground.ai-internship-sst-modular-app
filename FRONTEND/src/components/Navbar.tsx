import { NavLink } from "react-router-dom";
import { Home, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  return (
    <nav className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 ring-2 ring-primary/20">
              <Mic className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                STT Demo
              </span>
              <p className="text-xs text-muted-foreground">Real-time Transcription</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  isActive
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            
            <NavLink
              to="/recording"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  isActive
                    ? "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg shadow-accent/30"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <Mic className="w-4 h-4" />
              <span>Live Recording</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
