type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (next: number) => void;
};

export function RangeField({ label, value, min, max, step = 1, disabled, onChange }: RangeFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
