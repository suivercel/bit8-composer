import { RotateCcw, Settings2, X } from "lucide-react";

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

  function handleResetClick() {
    const confirmed = window.confirm(
      "配置した音や曲名を含めて、すべて消えて初期状態に戻ります。よろしいですか？",
    );

    if (confirmed) {
      onReset();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-[22px] border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold text-white">
              <Settings2 className="h-5 w-5" />
              Settings
            </div>
            <div className="mt-1 text-sm text-zinc-400">曲名の編集とリセットはここで行います。</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">Title</label>
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
            placeholder="曲名"
          />
        </div>

        <div className="mt-6 border-t border-zinc-800 pt-4">
          <div className="mb-1 text-sm text-zinc-400">Reset song</div>
          <div className="mb-3 text-sm leading-6 text-zinc-500">
            配置した音や曲名を含めて、すべて消えて初期状態に戻ります。
          </div>
          <button
            type="button"
            onClick={handleResetClick}
            className="inline-flex items-center gap-2 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-2 text-sm text-red-200 transition hover:border-red-700 hover:bg-red-950/60"
          >
            <RotateCcw className="h-4 w-4" />
            Reset song
          </button>
        </div>
      </div>
    </div>
  );
}
