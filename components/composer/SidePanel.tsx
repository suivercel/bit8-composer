import { Play, Square, Download, Trash2, Music2 } from "lucide-react";
import { SmallButton } from "@/components/ui/SmallButton";
import { BAR_OPTIONS } from "@/lib/song/defaults";
import { RangeField } from "@/components/ui/RangeField";
import { cls } from "@/lib/utils/cls";

export function SidePanel({
  title,
  tempo,
  bars,
  totalSteps,
  isPlaying,
  trackCount,
  onTitleChange,
  onTempoChange,
  onBarsChange,
  onPlay,
  onStop,
  onSave,
  onReset,
}: {
  title: string;
  tempo: number;
  bars: number;
  totalSteps: number;
  isPlaying: boolean;
  trackCount: number;
  onTitleChange: (next: string) => void;
  onTempoChange: (next: number) => void;
  onBarsChange: (next: number) => void;
  onPlay: () => void;
  onStop: () => void;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 sm:p-4 shadow-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-xl bg-zinc-800 p-2">
          <Music2 className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold leading-none">bit8 composer</h1>
          <p className="text-[11px] text-zinc-400 mt-1">スマホでも1画面で遊べる試作版</p>
        </div>
      </div>

      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-500"
          placeholder="曲名"
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onPlay}
            className={cls(
              "rounded-xl px-3 py-2 text-sm font-medium flex items-center justify-center gap-2 border",
              isPlaying
                ? "bg-zinc-100 text-zinc-950 border-zinc-100"
                : "border-zinc-700 bg-zinc-950 text-zinc-200",
            )}
          >
            <Play className="h-4 w-4" />
            Play
          </button>
          <button
            onClick={onStop}
            className={cls(
              "rounded-xl px-3 py-2 text-sm font-medium flex items-center justify-center gap-2 border",
              !isPlaying
                ? "bg-zinc-100 text-zinc-950 border-zinc-100"
                : "border-zinc-700 bg-zinc-950 text-zinc-200",
            )}
          >
            <Square className="h-4 w-4" />
            Stop
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onSave}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-sm font-medium flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={onReset}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-sm font-medium flex items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 space-y-3">
          <RangeField label="Tempo" value={tempo} min={80} max={180} onChange={onTempoChange} />

          <div>
            <div className="text-[11px] text-zinc-400 mb-2">Length</div>
            <div className="grid grid-cols-3 gap-2">
              {BAR_OPTIONS.map((value) => (
                <SmallButton key={value} onClick={() => onBarsChange(value)} active={bars === value}>
                  {value} bar
                </SmallButton>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-400">
          現在の曲の仕様: {bars} bar / {totalSteps} step / {trackCount} track。
        </div>
      </div>
    </aside>
  );
}
