import { CircleHelp, Download, Settings2 } from "lucide-react";

type ComposerHeaderProps = {
  title: string;
  onOpenSongMeta: () => void;
  onSave: () => void;
  onOpenHelp: () => void;
};

function HeaderActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-[11px] font-medium leading-none text-zinc-100 transition hover:border-zinc-500 hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function ComposerHeader({
  title,
  onOpenSongMeta,
  onSave,
  onOpenHelp,
}: ComposerHeaderProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-black/30 text-zinc-100">
            <span className="text-lg">♪</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">bit8 composer</h1>
            <p className="mt-1 text-sm font-medium text-zinc-200">Mix Bits. Mint Sound.</p>

            <div className="mt-4 max-w-[240px] rounded-xl border border-zinc-800 bg-black/30 p-3">
              <div className="text-[11px] font-medium leading-none text-zinc-500">Current title</div>
              <div className="mt-2 text-sm font-semibold text-white">{title}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <HeaderActionButton
            icon={<Download className="h-4 w-4" />}
            label="Save"
            onClick={onSave}
          />
          <HeaderActionButton
            icon={<Settings2 className="h-4 w-4" />}
            label="Settings"
            onClick={onOpenSongMeta}
          />
          <HeaderActionButton
            icon={<CircleHelp className="h-4 w-4" />}
            label="Help"
            onClick={onOpenHelp}
          />
        </div>
      </div>
    </div>
  );
}
