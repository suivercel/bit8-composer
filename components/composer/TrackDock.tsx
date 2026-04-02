import { Settings2, VolumeX } from "lucide-react";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

export function TrackDock({
  tracks,
  selectedTrackId,
  accentMap,
  onSelectTrack,
  onOpenSettings,
}: {
  tracks: SongTrack[];
  selectedTrackId: string;
  accentMap: Record<string, string>;
  onSelectTrack: (trackId: string) => void;
  onOpenSettings: (trackId: string) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      {tracks.map((track) => {
        const isSelected = track.id === selectedTrackId;

        return (
          <button
            key={track.id}
            type="button"
            onClick={() => onSelectTrack(track.id)}
            className={cls(
              "rounded-[16px] border bg-zinc-900/80 p-3 text-left transition",
              isSelected
                ? cls(accentMap[track.id], "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]")
                : "border-zinc-800 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-900",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold tracking-tight text-current">{track.name}</div>
              </div>

              <button
                type="button"
                aria-label={`${track.name} settings`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenSettings(track.id);
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-950 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-lg border border-zinc-800 bg-black/30 px-2 py-1">
                Wave: {track.wave}
              </span>
              <span className="rounded-lg border border-zinc-800 bg-black/30 px-2 py-1">
                Vol: {track.volume}
              </span>
              <span className="rounded-lg border border-zinc-800 bg-black/30 px-2 py-1">
                Oct: {track.octave}
              </span>
              {track.muted ? (
                <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-1 text-zinc-300">
                  <VolumeX className="h-3.5 w-3.5" />
                  Muted
                </span>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
