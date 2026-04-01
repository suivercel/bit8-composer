export function SongPanel({ bars, totalSteps }: { bars: number; totalSteps: number }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-sm font-medium mb-2">Guide</div>
        <div className="text-xs text-zinc-400 leading-5 space-y-2">
          <p>このタブは曲を編集する場所ではなく、使い方と設計図データの考え方を確認するための場所です。</p>
          <p>音は文字ではなく数値で保存します。各トラックは step ごとに音高番号を持ち、空欄は -1 です。</p>
          <p>JSON は軽量化のため、再生に必要な値だけを持ちます。</p>
          <p>将来はこの設計図から mp3 書き出し、NFT metadata 生成、再生専用プレイヤーに拡張できます。</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-sm font-medium mb-2">現在の曲の仕様</div>
        <div className="text-xs text-zinc-400 leading-5">
          1曲あたり {bars} bar / {totalSteps} step / 4 track。短いループ前提なので容量を抑えやすい設計です。
        </div>
      </div>
    </div>
  );
}
