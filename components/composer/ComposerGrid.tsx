import React from "react";
import { NOTE_LABELS, STEPS_PER_BAR } from "@/lib/song/defaults";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

export function ComposerGrid({
  totalSteps,
  currentStep,
  isPlaying,
  selectedTrack,
  onSetStep,
}: {
  totalSteps: number;
  currentStep: number;
  isPlaying: boolean;
  selectedTrack: SongTrack;
  onSetStep: (stepIndex: number, pitchIndex: number) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid gap-1" style={{ gridTemplateColumns: `44px repeat(${totalSteps}, minmax(0, 1fr))` }}>
          <div />
          {Array.from({ length: totalSteps }, (_, step) => (
            <div
              key={`head-${step}`}
              className={cls(
                "text-center text-[10px] py-1 rounded-md border",
                currentStep === step && isPlaying
                  ? "bg-zinc-100 text-zinc-950 border-zinc-100"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800",
              )}
            >
              {(step % STEPS_PER_BAR) + 1}
            </div>
          ))}

          {NOTE_LABELS.map((label, pitchIndex) => (
            <React.Fragment key={label}>
              <div className="h-9 flex items-center text-[10px] text-zinc-300 pr-1">{label}</div>
              {Array.from({ length: totalSteps }, (_, stepIndex) => {
                const active = selectedTrack.steps[stepIndex] === pitchIndex;
                const divider = (stepIndex + 1) % 4 === 0;
                return (
                  <button
                    key={`${label}-${stepIndex}`}
                    onClick={() => onSetStep(stepIndex, pitchIndex)}
                    className={cls(
                      "h-9 rounded-md border transition",
                      active ? "bg-zinc-100 border-zinc-100" : "bg-zinc-950 border-zinc-800 hover:border-zinc-600",
                      divider ? "border-r-2" : "",
                    )}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
