"use client";

import { useEffect, useRef, useState } from "react";
import { ComposerGrid } from "./ComposerGrid";
import { ComposerHeader } from "./ComposerHeader";
import { HelpDialog } from "./HelpDialog";
import { SongMetaDialog } from "./SongMetaDialog";
import { TrackDock } from "./TrackDock";
import { TrackSettingsDrawer } from "./TrackSettingsDrawer";
import { TransportBar } from "./TransportBar";
import { AudioEngine } from "@/lib/audio/engine";
import { createDefaultSong, resizeSteps } from "@/lib/song/defaults";
import { exportSongJson } from "@/lib/song/export";
import { loadSongFromLocal, saveSongToLocal } from "@/lib/song/songStore";
import { SongData, SongTrack } from "@/lib/song/schema";

const TRACK_ACCENTS: Record<string, string> = {
  lead: "border-sky-400/50 bg-sky-400/10 text-sky-100",
  harmony: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100",
  bass: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  noise: "border-amber-300/40 bg-amber-300/10 text-amber-100",
};

export function ComposerApp() {
  const [song, setSong] = useState<SongData>(createDefaultSong());
  const [selectedTrackId, setSelectedTrackId] = useState("lead");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTrackSettingsOpen, setIsTrackSettingsOpen] = useState(false);
  const [isSongMetaOpen, setIsSongMetaOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const engineRef = useRef<AudioEngine | null>(null);
  const songRef = useRef(song);
  const totalSteps = song.stepsPerBar * song.bars;

  const selectedTrack =
    song.tracks.find((track) => track.id === selectedTrackId) ?? song.tracks[0];

  useEffect(() => {
    const stored = loadSongFromLocal();
    if (stored) {
      setSong(stored);
    }
  }, []);

  useEffect(() => {
    songRef.current = song;
    saveSongToLocal(song);
  }, [song]);

  useEffect(() => {
    const engine = new AudioEngine();
    engineRef.current = engine;

    engine.init().then(() => {
      engine.setTempo(songRef.current.tempo);
      songRef.current.tracks.forEach((track) => {
        engine.setTrackWave(track);
      });
    });

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setTempo(song.tempo);
  }, [song.tempo]);

  useEffect(() => {
    song.tracks.forEach((track) => {
      engineRef.current?.setTrackWave(track);
    });
  }, [song.tracks]);

  useEffect(() => {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => ({
        ...track,
        steps: resizeSteps(track.steps, totalSteps),
      })),
    }));
  }, [totalSteps]);

  function updateSong(patch: Partial<SongData>) {
    setSong((prev) => ({ ...prev, ...patch }));
  }

  function updateTrack(trackId: string, patch: Partial<SongTrack>) {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) =>
        track.id === trackId ? { ...track, ...patch } : track,
      ),
    }));
  }

  function setStepValue(stepIndex: number, pitchIndex: number) {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => {
        if (track.id !== selectedTrackId) return track;
        const nextSteps = [...track.steps];
        nextSteps[stepIndex] = nextSteps[stepIndex] === pitchIndex ? -1 : pitchIndex;
        return { ...track, steps: nextSteps };
      }),
    }));
  }

  async function handlePlay() {
    if (isPlaying) return;
    const engine = engineRef.current;
    if (!engine) return;

    await engine.ensureStarted();
    engine.rebuild(() => songRef.current, (step) => setCurrentStep(step));
    engine.play();
    setIsPlaying(true);
  }

  function handleStop() {
    engineRef.current?.stop();
    setCurrentStep(0);
    setIsPlaying(false);
  }

  function handleReset() {
    handleStop();
    setSong(createDefaultSong());
    setSelectedTrackId("lead");
    setIsTrackSettingsOpen(false);
    setIsSongMetaOpen(false);
  }

  function clearSelectedTrack() {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) =>
        track.id === selectedTrackId
          ? { ...track, steps: Array.from({ length: totalSteps }, () => -1) }
          : track,
      ),
    }));
  }

  const accentClass = TRACK_ACCENTS[selectedTrack.id] ?? TRACK_ACCENTS.lead;

  return (
    <div className="min-h-screen bg-black px-3 py-3 text-zinc-100 sm:px-4 sm:py-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 rounded-[28px] border border-zinc-800 bg-zinc-950/95 p-3 shadow-2xl shadow-black/30 sm:p-4">
        <ComposerHeader
          title={song.title}
          onSave={() => exportSongJson(song)}
          onOpenSongMeta={() => setIsSongMetaOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        <TransportBar
          isPlaying={isPlaying}
          tempo={song.tempo}
          bars={song.bars}
          onPlay={handlePlay}
          onStop={handleStop}
          onTempoChange={(next) => updateSong({ tempo: next })}
          onBarsChange={(next) => updateSong({ bars: next as SongData["bars"] })}
        />

        <div className="rounded-[24px] border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4">
          <ComposerGrid
            totalSteps={totalSteps}
            currentStep={currentStep}
            isPlaying={isPlaying}
            selectedTrack={selectedTrack}
            accentClass={accentClass}
            onSetStep={setStepValue}
          />
        </div>

        <TrackDock
          tracks={song.tracks}
          selectedTrackId={selectedTrackId}
          accentMap={TRACK_ACCENTS}
          onSelectTrack={(trackId) => setSelectedTrackId(trackId)}
          onOpenSettings={(trackId) => {
            setSelectedTrackId(trackId);
            setIsTrackSettingsOpen(true);
          }}
        />
      </div>

      <TrackSettingsDrawer
        open={isTrackSettingsOpen}
        track={selectedTrack}
        accentClass={accentClass}
        onClose={() => setIsTrackSettingsOpen(false)}
        onUpdateTrack={updateTrack}
        onClearTrack={clearSelectedTrack}
      />

      <SongMetaDialog
        open={isSongMetaOpen}
        title={song.title}
        onClose={() => setIsSongMetaOpen(false)}
        onTitleChange={(next) => updateSong({ title: next })}
        onReset={handleReset}
      />

      <HelpDialog open={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
