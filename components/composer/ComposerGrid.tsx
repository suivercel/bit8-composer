import React from "react";
import { NOTE_LABELS, STEPS_PER_BAR } from "@/lib/song/defaults";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

const DISPLAY_NOTE_LABELS = [...NOTE_LABELS].reverse();

export function ComposerGrid({
  totalSteps,
  currentStep,
  isPlaying,
  selectedTrack,
  accentClass,
  onSetStep,
}: {
  totalSteps: number;
  currentStep: number;
  isPlaying: boolean;
  selectedTrack: SongTrack;
  accentClass: string;
  onSetStep: (stepIndex: number, pitchIndex: number) => void;
}) {
  return (
    <div className="space-y-3 overflow-x-auto">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Selected track</div>
        <div className={cls("mt-1 inline-flex rounded-lg border px-3 py-1 text-sm", accentClass)}>
          {selectedTrack.name}
        </div>
      </div>

      <div
        className="grid min-w-[720px] gap-1.5"
        style={{ gridTemplateColumns: `28px repeat(${totalSteps}, minmax(28px, 1fr))` }}
      >
        <div />
        {Array.from({ length: totalSteps }, (_, step) => {
          const isCurrent = isPlaying && currentStep === step;
          const isPrevious = isPlaying && currentStep === (step + 1) % totalSteps;
          const isBarEdge = step > 0 && step % STEPS_PER_BAR === 0;

          return (
            <div
              key={`timeline-${step}`}
              className={cls(
                "flex h-8 items-center justify-center rounded-md border text-xs transition",
                isCurrent
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : isPrevious
                    ? "border-zinc-600 bg-zinc-800/80 text-zinc-200"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400",
                isBarEdge ? "ml-1.5" : "",
              )}
            >
              {(step % STEPS_PER_BAR) + 1}
            </div>
          );
        })}

        {DISPLAY_NOTE_LABELS.map((label, rowIndex) => {
          const pitchIndex = DISPLAY_NOTE_LABELS.length - 1 - rowIndex;
          const isCRow = label.startsWith("C");

          return (
            <React.Fragment key={label}>
              <div
                className={cls(
                  "flex items-center justify-center text-xs",
                  isCRow ? "text-zinc-100" : "text-zinc-400",
                )}
              >
                {label}
              </div>

              {Array.from({ length: totalSteps }, (_, stepIndex) => {
                const active = selectedTrack.steps[stepIndex] === pitchIndex;
                const isCurrent = isPlaying && currentStep === stepIndex;
                const isPrevious = isPlaying && currentStep === (stepIndex + 1) % totalSteps;
                const isBarEdge = stepIndex > 0 && stepIndex % STEPS_PER_BAR === 0;
                const isQuarterEdge = (stepIndex + 1) % 4 === 0;

                return (
                  <button
                    key={`${label}-${stepIndex}`}
                    type="button"
                    onPointerDown={(event) => {
                      event.preventDefault();
                      onSetStep(stepIndex, pitchIndex);
                    }}
                    style={{ touchAction: "manipulation" }}
                    className={cls(
                      "relative h-9 rounded-md border transition",
                      active
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-600",
                      isCurrent ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" : "",
                      isPrevious ? "bg-zinc-900" : "",
                      isBarEdge ? "ml-1.5" : "",
                      isQuarterEdge ? "border-r-zinc-600" : "",
                      isCRow ? "border-t-zinc-700" : "",
                    )}
                  >
                    {isCurrent ? (
                      <span className="pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full bg-white/10" />
                    ) : null}
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
