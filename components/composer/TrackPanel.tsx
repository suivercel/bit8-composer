import { SmallButton } from "@/components/ui/SmallButton";
import { RangeField } from "@/components/ui/RangeField";
import { SongTrack } from "@/lib/song/schema";

export function TrackPanel({
  tracks,
  onUpdateTrack,
}: {
  tracks: SongTrack[];
  onUpdateTrack: (trackId: string, patch: Partial<SongTrack>) => void;
}) {
  return (
    <div className="space-y-3">
      {tracks.map((track) => (
        <div key={track.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-medium">{track.name}</div>
              <div className="text-[11px] text-zinc-400">{track.kind}</div>
            </div>
            <button
              onClick={() => onUpdateTrack(track.id, { muted: !track.muted })}
              className={`rounded-lg border px-3 py-1.5 text-xs ${track.muted ? "border-zinc-100 bg-zinc-100 text-zinc-950" : "border-zinc-700"}`}
            >
              {track.muted ? "Muted" : "Mute"}
            </button>
          </div>

          {track.kind !== "noise" && (
            <div>
              <div className="text-[11px] text-zinc-400 mb-2">Wave</div>
              <div className="grid grid-cols-2 gap-2">
                <SmallButton onClick={() => onUpdateTrack(track.id, { wave: "square" })} active={track.wave === "square"}>
                  square
                </SmallButton>
                <SmallButton onClick={() => onUpdateTrack(track.id, { wave: "triangle" })} active={track.wave === "triangle"}>
                  triangle
                </SmallButton>
              </div>
            </div>
          )}

          <RangeField
            label="Octave"
            value={track.octave}
            min={track.kind === "bass" ? 1 : 2}
            max={track.kind === "bass" ? 4 : 5}
            disabled={track.kind === "noise"}
            onChange={(next) => onUpdateTrack(track.id, { octave: next })}
          />

          <RangeField
            label="Volume"
            value={track.volume}
            min={-20}
            max={0}
            disabled={false}
            onChange={(next) => onUpdateTrack(track.id, { volume: next })}
          />
        </div>
      ))}
    </div>
  );
}
