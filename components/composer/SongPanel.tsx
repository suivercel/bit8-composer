export function SongPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-sm font-medium mb-2">Guide</div>
        <div className="text-xs text-zinc-400 leading-5 space-y-2">
          <p>8bit風の短いループ曲を作れるアプリです。</p>
          <p>グリッド上の音をタップして入力し、Playボタンを押すと再生できます。</p>
          <p>TempoではBPMを設定できます。</p>
          <p>Lengthでは曲の長さを 1・2・4 bar（小節）から選べます。</p>
          <p>このアプリでは、1小節を16ステップで表しています。</p>
          <p>曲はLead、Harmony、Bass、Noise の4トラックで構成されています。</p>
          <p>4つのトラックを組み合わせて音を重ねられます。</p>
          <p>各トラックでは、音色の切り替え、オクターブの調整、Mute の切り替えができます。</p>
        </div>
      </div>
    </div>
  );
}
