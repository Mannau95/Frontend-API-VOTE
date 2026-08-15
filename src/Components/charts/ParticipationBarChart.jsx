import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from "recharts";

/**
 * Cross-election participation comparison — single series (one hue, no
 * legend needed per the project's dataviz conventions), horizontal bars so
 * election names never truncate. Recharts' per-bar hover already satisfies
 * "the mark is the hit target"; no extra crosshair needed for a bar chart.
 * data: [{ name, participation }]
 */
function ParticipationTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const { name, participation } = payload[0].payload;
    return (
        <div className="rounded-lg bg-white ring-1 ring-slate-200 shadow-sm px-3 py-2 text-sm">
            <p className="text-slate-500">{name}</p>
            <p className="font-semibold text-slate-900">{participation}%</p>
        </div>
    );
}

export default function ParticipationBarChart({ data = [] }) {
    if (!data.length) {
        return (
            <p className="text-sm text-slate-500 text-center py-8">
                Aucune élection à comparer pour le moment.
            </p>
        );
    }

    // Fixed row height keeps bars ≤24px thick regardless of how many
    // elections there are, rather than letting Recharts stretch them.
    const chartHeight = Math.max(data.length * 44, 80);

    return (
        <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, bottom: 4, left: 4 }}>
                <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                />
                <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    tick={{ fill: "#334155", fontSize: 12 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                />
                <Tooltip content={<ParticipationTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="participation" fill="#4f46e5" barSize={20} radius={[0, 4, 4, 0]}>
                    <LabelList
                        dataKey="participation"
                        position="right"
                        formatter={(v) => `${v}%`}
                        style={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
