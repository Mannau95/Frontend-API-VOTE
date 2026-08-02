import { Calendar, ChevronRight, Landmark } from "lucide-react";
import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";
import { FormatDate } from "../utils/formatDate.js";
import { getCandidatureStatus } from "../utils/candidatureStatus.js";
import { excerpt } from "../utils/markdown.js";

export default function CandidatureCard({ candidature, election, candidateName }) {
    const status = getCandidatureStatus(candidature);
    const electionName = election?.name ?? `Élection #${candidature.election}`;

    return (
        <Card className="relative p-5 flex flex-col gap-3 h-full transition-shadow duration-200 hover:shadow-md">
            <Landmark className="absolute top-4 left-4 w-4 h-4 text-indigo-500 shrink-0" strokeWidth={2} />
            <Badge variant={status.variant} className="absolute top-4 right-4">
                {status.label}
            </Badge>

            <div className="py-4">
                <h3
                    className="font-semibold text-slate-900 leading-snug line-clamp-2"
                    title={electionName}
                >
                    {electionName}
                </h3>
                {candidateName && (
                    <p className="text-xs text-slate-400 mt-0.5 truncate" title={candidateName}>
                        {candidateName}
                    </p>
                )}
            </div>

            <p className="text-sm text-slate-500 line-clamp-3 h-[3.75rem]">
                {candidature.description
                    ? excerpt(candidature.description)
                    : "Aucune description fournie."}
            </p>

            {status.variant === "danger" && candidature.reject_message && (
                <p className="text-xs text-red-600 line-clamp-2">
                    Motif : {candidature.reject_message}
                </p>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-auto pt-3 border-t border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} />
                <span>Déposée le :</span>
                <span className="font-medium text-slate-700">
                    {FormatDate.fromIsoToString(candidature.date_candidature)}
                </span>
            </div>

            <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                Voir les détails
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </span>
        </Card>
    );
}
