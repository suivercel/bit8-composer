export function SongPanel({ bars, totalSteps }: { bars: number; totalSteps: number }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-sm font-medium mb-2">設計図データの考え方</div>
        <div className="text-xs text-zinc-400 leading-5 space-y-2">
          <p>音は文字ではなく数値で保存します。各トラックは step ごとに音高番号を持ち、空欄は -1 です。</p>
          <p>JSON は軽量化のため、再生に必要な値だけを持ちます。</p>
          <p>Lead、Harmony、Bass、Noise の4トラックで、短いループでもファミコン風の厚みを出しやすくしています。</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-sm font-medium mb-2">現在の曲の仕様</div>
        <div className="text-xs text-zinc-400 leading-5">
          1曲あたり {bars} bar / {totalSteps} step / 4 track。設計図を軽く保ちながら、主旋律、伴奏、低音、ノイズを重ねられる構成です。
        </div>
      </div>
    </div>
  );
}
