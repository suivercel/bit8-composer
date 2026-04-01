import { SongData } from "./schema";

const KEY = "bit8-composer-song";

export function saveSongToLocal(song: SongData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(song));
}

export function loadSongFromLocal(): SongData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SongData;
  } catch {
    return null;
  }
}
