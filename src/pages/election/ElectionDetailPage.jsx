// ElectionDetailPage.jsx
import { Settings } from "lucide-react";
import {ElectionOverview, VotingRules} from "./ElectionOverview.jsx";
import {ActivityLog, ParticipantsTable} from "./ElectionParticipant.jsx";
import {StatusSidebar} from "./StatusSidebar.jsx";
import Button from "../../Components/ui/Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CANDIDATE_TO_ELECTION} from "../../constants/urls.js";

// ── Données de démonstration ──────────────────────────────────────────────────
const ELECTION = {
    name: "Élection Annuelle des Délégués Syndicaux",
    description:
        "Cette élection vise à nommer les représentants des employés au conseil syndical pour l'année 2024-2025. Les délégués joueront un rôle crucial dans la défense des droits des travailleurs et la négociation des conditions de travail avec la direction. Le processus est ouvert à tous les employés permanents ayant au moins un an d'ancienneté. La transparence et l'équité sont les principes fondamentaux de cette élection.",
    category: "Interne",
};

const RULES = [
    "Éligibilité : Employés permanents avec >1 an d'ancienneté.",
    "Type de vote : Vote unique transférable.",
    "Anonymat : Vote entièrement anonyme et sécurisé.",
    "Validité : Minimum 50% de participation requise pour la validité.",
    "Procédure : Vote électronique via la plateforme VotePro.",
];

const STATUS = {
    label: "En cours",
    startDate: "01 Janvier 2024, 09:00",
    endDate: "15 Janvier 2024, 17:00",
};

const PARTICIPANTS = [
    { name: "Marie Dubois",   role: "Électeur",  status: "Confirmé" },
    { name: "Marc Lefevre",   role: "Candidat",  status: "Approuvé" },
    { name: "Sophie Martin",  role: "Électeur",  status: "Confirmé" },
    { name: "David Chen",     role: "Candidat",  status: "Approuvé" },
    { name: "Amélie Bernard", role: "Électeur",  status: "Confirmé" },
];

const ACTIVITIES = [
    { label: "Mise à jour de la description de l'élection.", time: "Il y a 2 heures" },
    { label: "Ajout de 100 nouveaux électeurs.",             time: "Il y a 1 jour" },
    { label: "Ouverture des candidatures.",                  time: "Il y a 3 jours" },
    { label: "Création de l'élection par Jean Dupont.",      time: "Il y a 1 semaine" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ElectionDetailPage() {
    const navigate = useNavigate();
    const [isCandidateModal, setIsCandidateModal] = useState(false);
    const openCandidateModal = () => {
        // setIsCandidateModal(true)
        navigate(CANDIDATE_TO_ELECTION)
    };
    const closeCandidateModal = () => setIsCandidateModal(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Détails de l'Élection</h1>
                <div className="flex items-center gap-2">
                    <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white " onClick={() => openCandidateModal()}>
                        Candidater l'Élection
                    </Button>
                    <Button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Settings size={15} />
                        Modifier l'Élection
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Colonne principale */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <ElectionOverview election={ELECTION} />
                    <VotingRules rules={RULES} />
                    <ParticipantsTable
                        voters={1200}
                        candidates={8}
                        participants={PARTICIPANTS}
                        onManage={() => console.log("Gérer les participants")}
                    />
                    <ActivityLog activities={ACTIVITIES} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <StatusSidebar
                        status={STATUS.label}
                        startDate={STATUS.startDate}
                        endDate={STATUS.endDate}
                        onViewCalendar={() => console.log("Voir le calendrier")}
                    />
                </div>

            </div>

            {/*MODAL*/}
        </div>
    );
}