import { RotateCcw, X } from "lucide-react";

export function SongMetaDialog({
  open,
  title,
  onClose,
  onTitleChange,
  onReset,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onTitleChange: (next: string) => void;
  onReset: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-[28px] border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-white">Title</div>
            <div className="mt-1 text-sm text-zinc-400">NFT向けの作品情報はここで管理します。</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">曲名</label>
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
            placeholder="曲名"
          />
        </div>

        <div className="mt-6 border-t border-zinc-800 pt-4">
          <div className="mb-2 text-sm text-zinc-400">Danger zone</div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-900/60 bg-red-950/40 px-4 py-2 text-sm text-red-200 transition hover:border-red-700 hover:bg-red-950/60"
          >
            <RotateCcw className="h-4 w-4" />
            Reset song
          </button>
        </div>
      </div>
    </div>
  );
}
