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
              "rounded-[22px] border bg-zinc-900/80 p-3 text-left transition hover:border-zinc-600",
              isSelected ? accentMap[track.id] : "border-zinc-800 text-zinc-100",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{track.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">
                  {track.kind}
                </div>
              </div>

              <button
                type="button"
                aria-label={`${track.name} settings`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenSettings(track.id);
                }}
                className="rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-xl border border-zinc-800 bg-black/30 px-2 py-1">
                Wave: {track.wave}
              </span>
              <span className="rounded-xl border border-zinc-800 bg-black/30 px-2 py-1">
                Vol: {track.volume}
              </span>
              <span className="rounded-xl border border-zinc-800 bg-black/30 px-2 py-1">
                Oct: {track.octave}
              </span>
              {track.muted ? (
                <span className="inline-flex items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-950 px-2 py-1 text-zinc-300">
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
