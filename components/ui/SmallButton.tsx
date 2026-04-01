import { cls } from "@/lib/utils/cls";

export function SmallButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "rounded-xl border px-3 py-2 text-xs font-medium",
        active ? "border-zinc-100 bg-zinc-100 text-zinc-950" : "border-zinc-700 bg-zinc-950 text-zinc-200",
      )}
    >
      {children}
    </button>
  );
}
