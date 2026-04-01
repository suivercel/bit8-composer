export type WaveType = "square" | "triangle" | "noise";
export type TrackKind = "lead" | "harmony" | "bass" | "noise";
export type ViewTab = "grid" | "tracks" | "song";

export type SongTrack = {
  id: string;
  name: string;
  kind: TrackKind;
  wave: WaveType;
  octave: number;
  volume: number;
  muted: boolean;
  steps: number[];
};

export type SongData = {
  version: 3;
  title: string;
  tempo: number;
  stepsPerBar: number;
  bars: number;
  tracks: SongTrack[];
  createdAt: string;
};
