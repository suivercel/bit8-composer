import React from "react";
import { Settings2, Volume2, VolumeX } from "lucide-react";
import { SongTrack } from "@/lib/song/schema";
import { cls } from "@/lib/utils/cls";

function InfoChip({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-black/30 px-2 py-1 text-[11px] font-medium leading-none text-zinc-300">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-100">{value}</span>
    </span>
  );
}

function CardActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
    >
      <Settings2 className="h-4 w-4" />
    </button>
  );
}

function MuteButton({
  muted,
  onClick,
}: {
  muted: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={muted}
      onClick={onClick}
      className={cls(
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium leading-none transition",
        muted
          ? "border-zinc-100 bg-zinc-100 text-zinc-950"
          : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:text-white",
      )}
    >
      {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
      <span>{muted ? "Muted" : "Mute"}</span>
    </button>
  );
}

export function TrackDock({
  tracks,
  selectedTrackId,
  accentMap,
  onSelectTrack,
  onOpenSettings,
  onToggleMute,
}: {
  tracks: SongTrack[];
  selectedTrackId: string;
  accentMap: Record<string, string>;
  onSelectTrack: (trackId: string) => void;
  onOpenSettings: (trackId: string) => void;
  onToggleMute: (trackId: string) => void;
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
              "rounded-xl border bg-zinc-900/80 p-3 text-left transition",
              isSelected
                ? cls(accentMap[track.id], "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]")
                : "border-zinc-800 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-900",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold tracking-tight text-current">{track.name}</div>
              </div>

              <CardActionButton
                label={`${track.name} settings`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenSettings(track.id);
                }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <InfoChip label="Wave" value={track.wave} />
              <InfoChip label="Vol" value={track.volume} />
              <InfoChip label="Oct" value={track.octave} />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <MuteButton
                muted={track.muted}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleMute(track.id);
                }}
              />

              <span
                className={cls(
                  "text-[11px] font-medium leading-none",
                  track.muted ? "text-zinc-500" : "text-zinc-600",
                )}
              >
                {track.muted ? "This track is muted" : "Tap to mute quickly"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
