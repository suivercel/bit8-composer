"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ComposerGrid } from "./ComposerGrid";
import { ComposerTabs } from "./ComposerTabs";
import { SidePanel } from "./SidePanel";
import { SongPanel } from "./SongPanel";
import { TrackPanel } from "./TrackPanel";
import { AudioEngine } from "@/lib/audio/engine";
import { createDefaultSong, resizeSteps } from "@/lib/song/defaults";
import { exportSongJson } from "@/lib/song/export";
import { loadSongFromLocal, saveSongToLocal } from "@/lib/song/songStore";
import { SongData, SongTrack, ViewTab } from "@/lib/song/schema";

export function ComposerApp() {
  const [song, setSong] = useState<SongData>(createDefaultSong());
  const [viewTab, setViewTab] = useState<ViewTab>("grid");
  const [selectedTrackId, setSelectedTrackId] = useState("lead");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const engineRef = useRef<AudioEngine | null>(null);

  const totalSteps = song.stepsPerBar * song.bars;
  const selectedTrack = song.tracks.find((t) => t.id === selectedTrackId) ?? song.tracks[0];

  const noteCount = useMemo(() => {
    return song.tracks.reduce((sum, track) => sum + track.steps.filter((v) => v >= 0).length, 0);
  }, [song.tracks]);

  useEffect(() => {
    const stored = loadSongFromLocal();
    if (stored) {
      setSong(stored);
      if (!stored.tracks.find((track) => track.id === "bass")) {
        setSong(createDefaultSong());
      }
    }
  }, []);

  useEffect(() => {
    saveSongToLocal(song);
  }, [song]);

  useEffect(() => {
    const engine = new AudioEngine();
    engineRef.current = engine;

    engine.init().then(() => {
      engine.setTempo(song.tempo);
      song.tracks.forEach((track) => engine.setTrackWave(track));
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
    song.tracks.forEach((track) => engineRef.current?.setTrackWave(track));
  }, [song.tracks]);

  useEffect(() => {
    setSong((prev) => {
      const nextTracks = prev.tracks.map((track) => ({
        ...track,
        steps: resizeSteps(track.steps, totalSteps),
      }));
      return { ...prev, tracks: nextTracks };
    });
  }, [totalSteps]);

  function updateSong(patch: Partial<SongData>) {
    setSong((prev) => ({ ...prev, ...patch }));
  }

  function updateTrack(trackId: string, patch: Partial<SongTrack>) {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => (track.id === trackId ? { ...track, ...patch } : track)),
    }));
  }

  function setStepValue(stepIndex: number, pitchIndex: number) {
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => {
        if (track.id !== selectedTrackId) return track;
        const next = [...track.steps];
        next[stepIndex] = next[stepIndex] === pitchIndex ? -1 : pitchIndex;
        return { ...track, steps: next };
      }),
    }));
  }

  async function handlePlay() {
    const engine = engineRef.current;
    if (!engine) return;

    await engine.ensureStarted();

    if (isPlaying) {
      engine.stop();
      setCurrentStep(0);
      setIsPlaying(false);
      return;
    }

    engine.rebuild(song, (step) => setCurrentStep(step));
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
  }

  function clearSelectedTrack() {
    handleStop();
    setSong((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) =>
        track.id === selectedTrackId
          ? { ...track, steps: Array.from({ length: totalSteps }, () => -1) }
          : track,
      ),
    }));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl grid gap-3 lg:grid-cols-[280px_1fr]">
        <SidePanel
          title={song.title}
          tempo={song.tempo}
          bars={song.bars}
          noteCount={noteCount}
          isPlaying={isPlaying}
          onTitleChange={(next) => updateSong({ title: next })}
          onTempoChange={(next) => updateSong({ tempo: next })}
          onBarsChange={(next) => updateSong({ bars: next })}
          onPlay={handlePlay}
          onStop={handleStop}
          onSave={() => exportSongJson(song)}
          onReset={handleReset}
        />

        <main className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 sm:p-4 shadow-2xl overflow-hidden">
          <ComposerTabs value={viewTab} onChange={setViewTab} />

          {viewTab === "grid" && (
            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {song.tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`rounded-xl border px-3 py-2 text-xs whitespace-nowrap ${selectedTrackId === track.id ? "border-zinc-100 bg-zinc-100 text-zinc-950" : "border-zinc-700 bg-zinc-950 text-zinc-200"}`}
                  >
                    {track.name}
                  </button>
                ))}
              </div>

              <ComposerGrid
                totalSteps={totalSteps}
                currentStep={currentStep}
                isPlaying={isPlaying}
                selectedTrack={selectedTrack}
                onSetStep={setStepValue}
              />

              <div className="flex items-center justify-between gap-2">
                <div className="text-[11px] text-zinc-400">選択中: {selectedTrack.name}</div>
                <button onClick={clearSelectedTrack} className="rounded-xl border border-zinc-700 px-3 py-2 text-xs">
                  このトラックを消去
                </button>
              </div>
            </div>
          )}

          {viewTab === "tracks" && <TrackPanel tracks={song.tracks} onUpdateTrack={updateTrack} />}
          {viewTab === "song" && <SongPanel bars={song.bars} totalSteps={totalSteps} />}
        </main>
      </div>
    </div>
  );
}
