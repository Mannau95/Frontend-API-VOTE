import { Calendar, Settings } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";

export function StatusSidebar({ status, startDate, endDate, onViewCalendar }) {
    return (
        <Card className="p-5 flex flex-col gap-4">
            <SectionTitle>Statut &amp; Dates</SectionTitle>
            <div className="flex items-center gap-2">
        <span className="animate-spin-slow">
          <Settings size={14} className="text-indigo-500" />
        </span>
                <span className="text-sm text-indigo-600 font-medium">
          Statut actuel : {status}
        </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Début :</span> {startDate}</p>
                <p><span className="font-medium">Fin :</span> {endDate}</p>
            </div>
            <button
                onClick={onViewCalendar}
                className="flex items-center justify-center gap-2 w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <Calendar size={14} />
                Voir le Calendrier
            </button>
        </Card>
    );
}