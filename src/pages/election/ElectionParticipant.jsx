import { Clock } from "lucide-react";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";
import Card from "../../Components/ui/Card.jsx";

function ParticipantRow({ name, role, status }) {
    return (
        <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 text-sm text-gray-800">{name}</td>
            <td className="py-3 px-4 text-sm text-gray-500">{role}</td>
            <td className="py-3 px-4">
                <Badge variant={status === "Confirmé" ? "success" : "approved"}>
                    {status}
                </Badge>
            </td>
        </tr>
    );
}

export function ParticipantsTable({ voters, candidates, participants, onManage }) {
    return (
        <Card className="p-6">
            <SectionTitle>Participants</SectionTitle>
            <div className="flex gap-6 mb-4 text-sm text-gray-600">
                <span><strong className="text-gray-900">{voters}</strong> Électeurs inscrits</span>
                <span><strong className="text-gray-900">{candidates}</strong> Candidats</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nom</th>
                        <th className="py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rôle</th>
                        <th className="py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map((p, i) => (
                        <ParticipantRow key={i} {...p} />
                    ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={onManage}
                className="mt-4 w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
                Gérer les Participants
            </button>
        </Card>
    );
}

function ActivityItem({ label, time }) {
    return (
        <li className="flex items-start gap-3 text-sm text-gray-600 py-2 border-b border-gray-100 last:border-0">
            <Clock size={14} className="mt-0.5 shrink-0 text-gray-400" />
            <span>
        {label}{" "}
                <span className="text-gray-400 text-xs">({time})</span>
      </span>
        </li>
    );
}

export function ActivityLog({ activities }) {
    return (
        <Card className="p-6">
            <SectionTitle>Journal des Activités</SectionTitle>
            <ul>
                {activities.map((a, i) => (
                    <ActivityItem key={i} {...a} />
                ))}
            </ul>
        </Card>
    );
}