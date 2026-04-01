import { Grid3X3, Layers3, SlidersHorizontal } from "lucide-react";
import { SmallButton } from "@/components/ui/SmallButton";
import { ViewTab } from "@/lib/song/schema";

export function ComposerTabs({
  value,
  onChange,
}: {
  value: ViewTab;
  onChange: (next: ViewTab) => void;
}) {
  return (
    <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
      <SmallButton onClick={() => onChange("grid")} active={value === "grid"}>
        <span className="inline-flex items-center gap-1"><Grid3X3 className="h-4 w-4" /> Grid</span>
      </SmallButton>
      <SmallButton onClick={() => onChange("tracks")} active={value === "tracks"}>
        <span className="inline-flex items-center gap-1"><Layers3 className="h-4 w-4" /> Tracks</span>
      </SmallButton>
      <SmallButton onClick={() => onChange("song")} active={value === "song"}>
        <span className="inline-flex items-center gap-1"><SlidersHorizontal className="h-4 w-4" /> Song</span>
      </SmallButton>
    </div>
  );
}
