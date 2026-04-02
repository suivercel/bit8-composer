import { CircleHelp, X } from "lucide-react";

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
      <div className="w-full max-w-xl rounded-[22px] border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold text-white">
              <CircleHelp className="h-5 w-5" />
              Help
            </div>
            <div className="mt-1 text-sm text-zinc-400">このアプリでできることと基本操作です。</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
          <p>8bit風の短いループ曲を作れるアプリです。</p>
          <p>トラックに音を配置して、Playボタンを押すと再生できます。</p>
          <p>TempoではBPMを設定できます。</p>
          <p>Lengthでは曲の長さを 1・2・4 bar から選べます。</p>
          <p>このアプリでは、1小節を16ステップで表しています。</p>
          <p>曲は Lead、Harmony、Bass、Noise の4トラックで構成されています。</p>
          <p>4つのトラックを組み合わせて音を重ねることができます。</p>
          <p>各トラックでは、音色の切り替え、オクターブの調整、Mute設定ができます。</p>
        </div>
      </div>
    </div>
  );
}
