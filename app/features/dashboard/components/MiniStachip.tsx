export interface MiniStat {
    label: string;
    value: string;
    growth?: string;
    valueColorClassName?: string;
}

interface MiniStatRowProps {
    stats: MiniStat[];
}

export function MiniStatRow({ stats }: MiniStatRowProps) {
    return (
        <div className={`grid gap-2 mt-6`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
            {stats.map((s) => (
                <div key={s.label} className="bg-[#6E5A40] rounded-[6px] px-3 py-2.5">
                    <p className="text-[11px] text-gray-300 font-medium leading-4 mt-0.5">{s.label}</p>
                    <p className={`text-sm font-medium leading-5 ${s.valueColorClassName ?? "text-white"}`}>
                        {s.value}
                    </p>
                   
                    {s.growth && <p className="text-[10px] text-emerald-600 font-medium mt-0.5">{s.growth}</p>}
                </div>
            ))}
        </div>
    );
}