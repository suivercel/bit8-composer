import { X } from "lucide-react";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

const WAVE_OPTIONS: Array<SongTrack["wave"]> = ["square", "triangle", "noise"];
const OCTAVE_OPTIONS = [1, 2, 3, 4, 5];

export function TrackSettingsDrawer({
  open,
  track,
  accentClass,
  onClose,
  onUpdateTrack,
  onClearTrack,
}: {
  open: boolean;
  track: SongTrack;
  accentClass: string;
  onClose: () => void;
  onUpdateTrack: (trackId: string, patch: Partial<SongTrack>) => void;
  onClearTrack: () => void;
}) {
  if (!open) return null;

  const canSelectWave = track.kind !== "noise";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-4xl px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Track settings</div>
            <div className={cls("mt-1 inline-flex rounded-full border px-3 py-1 text-sm", accentClass)}>
              {track.name}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-3">
            <div className="mb-2 text-sm font-medium text-zinc-100">Wave</div>
            <div className="flex gap-2">
              {WAVE_OPTIONS.map((wave) => {
                const disabled = !canSelectWave && wave !== "noise";
                return (
                  <button
                    key={wave}
                    type="button"
                    disabled={disabled}
                    onClick={() => onUpdateTrack(track.id, { wave })}
                    className={cls(
                      "flex-1 rounded-2xl border px-3 py-2 text-sm transition",
                      track.wave === wave
                        ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                        : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500",
                      disabled ? "cursor-not-allowed opacity-40" : "",
                    )}
                  >
                    {wave}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-3">
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-100">
              <span>Volume</span>
              <span className="text-xs text-zinc-400">{track.volume}</span>
            </div>
            <input
              type="range"
              min={-24}
              max={6}
              step={1}
              value={track.volume}
              onChange={(event) =>
                onUpdateTrack(track.id, { volume: Number(event.target.value) })
              }
              className="w-full"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-3">
            <div className="mb-2 text-sm font-medium text-zinc-100">Octave</div>
            <div className="flex gap-2">
              {OCTAVE_OPTIONS.map((octave) => (
                <button
                  key={octave}
                  type="button"
                  onClick={() => onUpdateTrack(track.id, { octave })}
                  className={cls(
                    "flex-1 rounded-2xl border px-3 py-2 text-sm transition",
                    track.octave === octave
                      ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                      : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500",
                  )}
                >
                  {octave}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-3">
            <div className="mb-2 text-sm font-medium text-zinc-100">Mute</div>
            <button
              type="button"
              onClick={() => onUpdateTrack(track.id, { muted: !track.muted })}
              className={cls(
                "rounded-2xl border px-4 py-2 text-sm transition",
                track.muted
                  ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                  : "border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500",
              )}
            >
              {track.muted ? "Muted" : "Mute off"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClearTrack}
            className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            このトラックを消去
          </button>
        </div>
      </div>
    </div>
  );
}
