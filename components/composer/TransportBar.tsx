import { Play, Square } from "lucide-react";
import { BAR_OPTIONS } from "@/lib/song/defaults";
import { cls } from "@/lib/utils/cls";

export function TransportBar({
  isPlaying,
  tempo,
  bars,
  onPlay,
  onStop,
  onTempoChange,
  onBarsChange,
}: {
  isPlaying: boolean;
  tempo: number;
  bars: number;
  onPlay: () => void;
  onStop: () => void;
  onTempoChange: (next: number) => void;
  onBarsChange: (next: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-zinc-800 bg-zinc-900/70 p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPlay}
          className={cls(
            "inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition",
            isPlaying
              ? "border-zinc-700 bg-zinc-900 text-zinc-500"
              : "border-zinc-100 bg-zinc-100 text-zinc-950 hover:bg-white",
          )}
        >
          <Play className="h-4 w-4" />
          Play
        </button>

        <button
          type="button"
          onClick={onStop}
          className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500"
        >
          <Square className="h-4 w-4" />
          Stop
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-3">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
            <span>Tempo</span>
            <span className="text-sm font-semibold text-zinc-100">{tempo}</span>
          </div>
          <input
            type="range"
            min={60}
            max={200}
            step={1}
            value={tempo}
            onChange={(event) => onTempoChange(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black/30 px-3 py-3">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
            <span>Length</span>
            <span>{isPlaying ? "再生中は変更できません" : ""}</span>
          </div>
          <div className="flex gap-2">
            {BAR_OPTIONS.map((value) => {
              const selected = bars === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={isPlaying}
                  onClick={() => onBarsChange(value)}
                  className={cls(
                    "flex-1 rounded-lg border px-3 py-2 text-sm transition",
                    isPlaying
                      ? selected
                        ? "cursor-not-allowed border-zinc-700 bg-zinc-800 text-zinc-300"
                        : "cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600"
                      : selected
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500",
                  )}
                >
                  {value} bar
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
