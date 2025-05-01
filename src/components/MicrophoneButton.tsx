
import { Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MicrophoneButtonProps {
  onRecordStart: () => void;
  onRecordEnd: () => void;
  isRecording: boolean;
}

const MicrophoneButton = ({ onRecordStart, onRecordEnd, isRecording }: MicrophoneButtonProps) => {

   const handleMicClick = () => {
    if (isRecording) {
      onRecordEnd();
    } else {
      onRecordStart();
    }
  };

  return (
    <div className="relative" onClick={handleMicClick}>
      {isRecording && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7226FF] via-[#160078] to-[#010030] opacity-70 animate-pulse-ring" />
      )}
      <Button
      className={cn(
        "h-24 w-24 rounded-full text-white shadow-inner shadow-black/30 transition-transform",
        "bg-gradient-to-r from-[#d4d4d4] via-[#f4f4f4] to-[#a3a3a3] bg-[length:300%_300%] animate-chrome-glow",
        "hover:scale-105 border border-white/20"
      )}
      >
      <Mic className="h-10 w-10 text-zinc-800" />
      </Button>
    </div>

  );
};

export default MicrophoneButton;
