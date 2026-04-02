import { X } from "lucide-react";

export function HelpDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-xl rounded-[28px] border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-white">Guide</div>
            <div className="mt-1 text-sm text-zinc-400">いま必要な操作だけに絞った説明です。</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-300">
          <p>下のトラック帯で音の層を選び、中央のグリッドを押して音を置きます。</p>
          <p>再生中にまだ通っていない列へ置いた音は、その周回のまま反映されます。通過済みの列は次の周回から反映されます。</p>
          <p>Track settings では音色、音量、オクターブ、ミュートを調整できます。</p>
          <p>Title は作品情報用です。作曲中はグリッドと再生を主役にして使う構成です。</p>
        </div>
      </div>
    </div>
  );
}
