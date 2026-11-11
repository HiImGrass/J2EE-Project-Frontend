export type MemoryLevelCounts = [number, number, number, number, number];

type MemoryLevelChartProps = {
    /** Số từ ở từng mức, theo thứ tự Lv 1 → Lv 5 */
    counts: MemoryLevelCounts;
    className?: string;
};

const BAR_COLORS = [
    "bg-[#D1D8F1]",
    "bg-[#A3B1E3]",
    "bg-[#758AD4]",
    "bg-[#4763C6]",
    "bg-[#193CB8]",
] as const;

export function MemoryLevelChart({ counts, className = "" }: MemoryLevelChartProps) {
    const max = Math.max(...counts, 1);
    const total = counts.reduce((sum, n) => sum + n, 0);

    return (
        <div className="flex flex-col w-full gap-8 rounded-xl border-2 p-4 border-slate-300">
            <div className="flex justify-between">
                <div className="font-medium">Từ vựng theo mức nhớ</div>
                <div className="bg-primary text-white p-2 font-medium rounded-md">{total}</div>
            </div>
            <div
                className={`w-full ${className}`}
                role="img"
                aria-label={counts.map((n, i) => `Mức ${i + 1}: ${n} từ`).join(", ")}
            >
                {/* Cột: chừa 28px phía trên mỗi cột cho con số */}
                <div className="grid h-56 grid-cols-5 items-end gap-2.5 border-b border-slate-200">
                    {counts.map((n, i) => (
                        <div key={i} className="flex h-full min-w-0 flex-col items-center justify-end">
                            <span className="mb-1.5 text-[15px] font-semibold tabular-nums text-slate-800">
                                {n}
                            </span>
                            <div
                                className={`min-h-1 w-full max-w-12 rounded-t-lg transition-[height] duration-500 ease-out motion-reduce:transition-none ${BAR_COLORS[i]}`}
                                style={{ height: `calc((100% - 28px) * ${n / max})` }}
                            />
                        </div>
                    ))}
                </div>

                {/* Nhãn mức */}
                <div className="mt-2 grid grid-cols-5 gap-2.5 text-center text-xs font-medium text-slate-500">
                    {counts.map((_, i) => (
                        <span key={i}>Lv {i + 1}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
