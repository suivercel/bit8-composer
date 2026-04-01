import { SongData } from "./schema";

export function exportSongJson(song: SongData) {
  const payload = {
    ...song,
    createdAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${song.title.replace(/\s+/g, "-").toLowerCase() || "bit8-song"}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
