import React, { useRef } from "react";
import { NOTE_LABELS, STEPS_PER_BAR } from "@/lib/song/defaults";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

const DISPLAY_NOTE_LABELS = [...NOTE_LABELS].reverse();
const MOVE_THRESHOLD = 10;

type GestureState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  moved: boolean;
};

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
  const gestureRef = useRef<GestureState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  function beginGesture(pointerId: number, clientX: number, clientY: number) {
    gestureRef.current = {
      pointerId,
      startX: clientX,
      startY: clientY,
      moved: false,
    };
  }

  function updateGesture(pointerId: number, clientX: number, clientY: number) {
    if (gestureRef.current.pointerId !== pointerId) return;

    const dx = Math.abs(clientX - gestureRef.current.startX);
    const dy = Math.abs(clientY - gestureRef.current.startY);

    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      gestureRef.current.moved = true;
    }
  }

  function endGesture(pointerId: number, stepIndex: number, pitchIndex: number) {
    if (gestureRef.current.pointerId !== pointerId) return;

    if (!gestureRef.current.moved) {
      onSetStep(stepIndex, pitchIndex);
    }

    gestureRef.current.pointerId = null;
  }

  function cancelGesture() {
    gestureRef.current.pointerId = null;
  }

  return (
    <div className="space-y-4 overflow-x-auto">
      <div className="flex items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Selected track</div>
          <div className={cls("mt-1 inline-flex rounded-lg border px-3 py-1 text-sm", accentClass)}>
            {selectedTrack.name}
          </div>
        </div>
      </div>

      <div
        className="grid min-w-[720px] gap-1.5"
        style={{ gridTemplateColumns: `28px repeat(${totalSteps}, minmax(28px, 1fr))` }}
      >
        <div />
        {Array.from({ length: totalSteps }, (_, step) => {
          const stepNumber = (step % STEPS_PER_BAR) + 1;
          const isCurrent = isPlaying && currentStep === step;
          const isPrevious = isPlaying && currentStep === (step + 1) % totalSteps;
          const isQuarterEdge = stepNumber % 4 === 0;
          const isBarEnd = stepNumber === STEPS_PER_BAR;

          return (
            <div
              key={`timeline-${step}`}
              className={cls(
                "flex h-8 items-center justify-center rounded-lg border text-xs transition",
                isCurrent
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : isPrevious
                    ? "border-zinc-600 bg-zinc-800/80 text-zinc-200"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400",
                isBarEnd
                  ? "border-r-zinc-100"
                  : isQuarterEdge
                    ? "border-r-zinc-500"
                    : "",
              )}
            >
              {stepNumber}
            </div>
          );
        })}

        {DISPLAY_NOTE_LABELS.map((label, rowIndex) => {
          const pitchIndex = DISPLAY_NOTE_LABELS.length - 1 - rowIndex;

          return (
            <React.Fragment key={label}>
              <div className="flex items-center justify-center text-sm text-zinc-400">
                {label}
              </div>

              {Array.from({ length: totalSteps }, (_, stepIndex) => {
                const stepNumber = (stepIndex % STEPS_PER_BAR) + 1;
                const active = selectedTrack.steps[stepIndex] === pitchIndex;
                const isCurrent = isPlaying && currentStep === stepIndex;
                const isPrevious = isPlaying && currentStep === (stepIndex + 1) % totalSteps;
                const isQuarterEdge = stepNumber % 4 === 0;
                const isBarEnd = stepNumber === STEPS_PER_BAR;

                return (
                  <button
                    key={`${label}-${stepIndex}`}
                    type="button"
                    onPointerDown={(event) => {
                      beginGesture(event.pointerId, event.clientX, event.clientY);
                    }}
                    onPointerMove={(event) => {
                      updateGesture(event.pointerId, event.clientX, event.clientY);
                    }}
                    onPointerUp={(event) => {
                      endGesture(event.pointerId, stepIndex, pitchIndex);
                    }}
                    onPointerCancel={() => {
                      cancelGesture();
                    }}
                    style={{ touchAction: "pan-x" }}
                    className={cls(
                      "relative h-9 rounded-lg border transition",
                      active
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-800 bg-zinc-950 hover:border-zinc-600",
                      isCurrent ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" : "",
                      isPrevious ? "bg-zinc-900" : "",
                      isBarEnd
                        ? "border-r-zinc-100"
                        : isQuarterEdge
                          ? "border-r-zinc-500"
                          : "",
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
