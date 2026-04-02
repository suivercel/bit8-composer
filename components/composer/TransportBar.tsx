import { Pause, Play } from "lucide-react";
import { cls } from "@/lib/utils/cls";

function SectionLabel({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[11px] font-medium leading-none text-zinc-500">{label}</span>
      {value !== undefined ? (
        <span className="text-[11px] font-medium leading-none text-zinc-300">{value}</span>
      ) : null}
    </div>
  );
}

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
  onBarsChange: (next: 1 | 2 | 4) => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onPlay}
            className={cls(
              "inline-flex min-w-[88px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition",
              isPlaying
                ? "border-zinc-700 bg-zinc-900 text-zinc-500"
                : "border-zinc-100 bg-zinc-100 text-zinc-950 hover:bg-white",
            )}
          >
            <Play className="h-4 w-4" />
            <span>Play</span>
          </button>

          <button
            type="button"
            onClick={onStop}
            className={cls(
              "inline-flex min-w-[88px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition",
              isPlaying
                ? "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500"
                : "border-zinc-700 bg-zinc-950 text-zinc-400",
            )}
          >
            <Pause className="h-4 w-4" />
            <span>Stop</span>
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
          <div className="rounded-xl border border-zinc-800 bg-black/30 p-3">
            <SectionLabel label="Tempo" value={tempo} />
            <input
              type="range"
              min={60}
              max={180}
              step={1}
              value={tempo}
              onChange={(event) => onTempoChange(Number(event.target.value))}
              className="w-full"
            />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-black/30 p-3">
            <SectionLabel label="Length" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 4].map((value) => {
                const disabled = isPlaying;
                const selected = bars === value;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => onBarsChange(value as 1 | 2 | 4)}
                    className={cls(
                      "rounded-md border px-3 py-2 text-[11px] font-medium leading-none transition",
                      selected
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500",
                      disabled ? "cursor-not-allowed opacity-40" : "",
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
    </div>
  );
}
