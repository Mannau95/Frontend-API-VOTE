/**
 * Client-side CSV export for a vote breakdown — no backend endpoint or new
 * dependency needed, the data is already returned by /results/ and /stats/.
 * results: [{ candidate_name, votes, percentage }]
 */
export function resultsToCsv(results = []) {
    const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const header = ["Candidat", "Votes", "Pourcentage"].map(escape).join(",");
    const rows = results.map((r) => [r.candidate_name, r.votes, `${r.percentage}%`].map(escape).join(","));
    return [header, ...rows].join("\r\n");
}

/** Triggers a browser download of `content` as a file named `filename`. */
export function downloadCsv(filename, content) {
    // BOM so Excel (French locale included) opens accented characters correctly.
    const blob = new Blob(["﻿" + content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
