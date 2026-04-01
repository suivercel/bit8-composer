import { SongData, SongTrack, TrackKind, WaveType } from "./schema";

export const STEPS_PER_BAR = 16;
export const DEFAULT_BARS = 2;
export const DEFAULT_TEMPO = 132;
export const BAR_OPTIONS = [1, 2, 4] as const;

export const PITCHES = [0, 2, 4, 5, 7, 9, 11, 12];
export const NOTE_LABELS = ["C", "D", "E", "F", "G", "A", "B", "C+"];

export function createTrack(
  id: string,
  name: string,
  kind: TrackKind,
  wave: WaveType,
  bars: number,
): SongTrack {
  const octave =
    kind === "harmony" ? 3 :
    kind === "bass" ? 2 :
    4;

  const volume =
    kind === "noise" ? -12 :
    kind === "bass" ? -7 :
    -8;

  return {
    id,
    name,
    kind,
    wave,
    octave,
    volume,
    muted: false,
    steps: Array.from({ length: STEPS_PER_BAR * bars }, () => -1),
  };
}

export function createDefaultSong(): SongData {
  return {
    version: 3,
    title: "My bit8 Loop",
    tempo: DEFAULT_TEMPO,
    stepsPerBar: STEPS_PER_BAR,
    bars: DEFAULT_BARS,
    tracks: [
      createTrack("lead", "Lead", "lead", "square", DEFAULT_BARS),
      createTrack("harmony", "Harmony", "harmony", "triangle", DEFAULT_BARS),
      createTrack("bass", "Bass", "bass", "square", DEFAULT_BARS),
      createTrack("noise", "Noise", "noise", "noise", DEFAULT_BARS),
    ],
    createdAt: new Date().toISOString(),
  };
}

export function resizeSteps(steps: number[], nextLength: number) {
  if (steps.length === nextLength) return steps;
  if (steps.length > nextLength) return steps.slice(0, nextLength);
  return [...steps, ...Array.from({ length: nextLength - steps.length }, () => -1)];
}
