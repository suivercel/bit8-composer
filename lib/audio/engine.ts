import * as Tone from "tone";

import { PITCHES } from "@/lib/song/defaults";
import { SongData, SongTrack } from "@/lib/song/schema";

import { midiToNoteName } from "./note";

type SynthMap = Record<string, Tone.Synth | Tone.NoiseSynth | null>;

type SongProvider = () => SongData;

export class AudioEngine {
  private synths: SynthMap = {};
  private sequence: Tone.Sequence<number> | null = null;

  async init() {
    this.synths = {
      lead: new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0.05, release: 0.04 },
        volume: -8,
      }).toDestination(),
      harmony: new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.001, decay: 0.06, sustain: 0.03, release: 0.05 },
        volume: -10,
      }).toDestination(),
      bass: new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.001, decay: 0.08, sustain: 0.04, release: 0.06 },
        volume: -7,
      }).toDestination(),
      noise: new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 },
        volume: -12,
      }).toDestination(),
    };
  }

  async ensureStarted() {
    if (Tone.context.state !== "running") {
      await Tone.start();
    }
  }

  setTempo(tempo: number) {
    Tone.Transport.bpm.rampTo(tempo, 0.03);
  }

  setTrackWave(track: SongTrack) {
    if (track.kind === "noise") return;

    const synth = this.synths[track.id] as Tone.Synth | undefined;
    if (!synth) return;

    synth.oscillator.type = track.wave === "triangle" ? "triangle" : "square";
    synth.volume.value = track.volume;
  }

  rebuild(getSong: SongProvider, onStep: (step: number) => void) {
    const firstSong = getSong();
    const totalSteps = firstSong.stepsPerBar * firstSong.bars;
    const steps = Array.from({ length: totalSteps }, (_, step) => step);

    if (this.sequence) {
      this.sequence.dispose();
      this.sequence = null;
    }

    this.sequence = new Tone.Sequence<number>(
      (time, step) => {
        const song = getSong();
        onStep(step);

        song.tracks.forEach((track) => {
          if (track.muted) return;

          const pitchIndex = track.steps[step];
          if (pitchIndex == null || pitchIndex < 0) return;

          if (track.kind === "noise") {
            const noise = this.synths[track.id] as Tone.NoiseSynth | undefined;
            if (noise) noise.volume.value = track.volume;
            noise?.triggerAttackRelease("16n", time, 0.6);
            return;
          }

          const midi = 12 * (track.octave + 1) + PITCHES[pitchIndex];
          const note = midiToNoteName(midi);
          const synth = this.synths[track.id] as Tone.Synth | undefined;
          if (synth) synth.volume.value = track.volume;
          synth?.triggerAttackRelease(
            note,
            track.kind === "bass" ? "8n" : "16n",
            time,
            0.8,
          );
        });
      },
      steps,
      "16n",
    );

    this.sequence.start(0);
  }

  play() {
    Tone.Transport.position = 0;
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  dispose() {
    this.sequence?.dispose();
    Object.values(this.synths).forEach((synth) => synth?.dispose());
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
}
