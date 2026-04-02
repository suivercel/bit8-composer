import { Download, Settings2, CircleHelp, Music2 } from "lucide-react";

export function ComposerHeader({
  title,
  onSave,
  onOpenSongMeta,
  onOpenHelp,
}: {
  title: string;
  onSave: () => void;
  onOpenSongMeta: () => void;
  onOpenHelp: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-zinc-800 bg-zinc-900/70 p-3 sm:flex-row sm:items-start sm:justify-between sm:p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-100">
            <Music2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-2xl font-semibold tracking-tight text-white">bit8 composer</div>
            <div className="text-sm text-zinc-300">Mix Bits. Mint Sound.</div>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-zinc-800 bg-black/40 px-3 py-2">
          <div className="text-[11px] text-zinc-400">Current title</div>
          <div className="truncate text-sm font-medium text-zinc-100">{title}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500"
        >
          <Download className="h-4 w-4" />
          Save
        </button>

        <button
          type="button"
          onClick={onOpenSongMeta}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500"
        >
          <Settings2 className="h-4 w-4" />
          Settings
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100"
        >
          <CircleHelp className="h-4 w-4" />
          Help
        </button>
      </div>
    </div>
  );
}
