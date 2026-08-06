import React from "react";

/**
 * Single-series horizontal bar chart for a vote breakdown.
 * results: [{ candidate_id, candidate_name, votes, percentage }]
 * One series (votes) -> no legend needed, single brand hue, direct labels
 * at the bar tip (votes + %) per the project's dataviz conventions.
 */
export default function ResultsBarChart({ results = [], winnerId = null }) {
    if (!results.length) {
        return (
            <p className="text-sm text-slate-500 text-center py-8">
                Aucun vote enregistré pour le moment.
            </p>
        );
    }

    const maxVotes = Math.max(...results.map((r) => r.votes), 1);

    return (
        <div className="flex flex-col gap-3 py-2" role="img" aria-label="Répartition des votes par candidat">
            {results.map((r) => {
                const isWinner = winnerId != null && r.candidate_id === winnerId;
                const widthPct = Math.max((r.votes / maxVotes) * 100, r.votes > 0 ? 2 : 0);
                return (
                    <div key={r.candidate_id} className="flex items-center gap-3">
                        <span
                            className={`w-32 shrink-0 truncate text-sm text-right ${isWinner ? "font-semibold text-slate-900" : "text-slate-600"}`}
                            title={r.candidate_name}
                        >
                            {r.candidate_name}
                        </span>
                        <div className="flex-1 h-6 rounded-full bg-slate-100 relative overflow-hidden">
                            <div
                                className={`h-6 rounded-full transition-all ${isWinner ? "bg-indigo-600" : "bg-indigo-400"}`}
                                style={{ width: `${widthPct}%` }}
                            />
                        </div>
                        <span className="w-20 shrink-0 text-sm text-slate-700 tabular-nums">
                            {r.votes} <span className="text-slate-400">({r.percentage}%)</span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
