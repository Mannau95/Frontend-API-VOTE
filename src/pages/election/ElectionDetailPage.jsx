// ElectionDetailPage.jsx
import { Settings } from "lucide-react";
import {ElectionOverview, VotingRules} from "./ElectionOverview.jsx";
import {ActivityLog, ParticipantsTable} from "./ElectionParticipant.jsx";
import {StatusSidebar} from "./StatusSidebar.jsx";
import Button from "../../Components/ui/Button.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../../store/electionSlice.js";
import {FormatDate} from "../../utils/formatDate.js";
import {computeElectionStatusLabel} from "../../utils/electionStatus.js";
import CandidatureFormPage from "../Candidatures/CandidatureFormPage.jsx";

// ── Données de démonstration (utilisées pour les infos non fournies par le back) ──
const MOCK_ELECTION = {
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

const MOCK_STATUS = {
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
    const dispatch = useDispatch();
    const { electionId } = useParams();
    const { elections } = useSelector((state) => state.elections);
    const [isCandidateModal, setIsCandidateModal] = useState(false);

    useEffect(() => {
        if (!elections.length) {
            dispatch(fetchElections());
        }
    }, []);

    const election = elections.find((e) => String(e.id) === String(electionId));

    const openCandidateModal = () => setIsCandidateModal(true);
    const closeCandidateModal = () => setIsCandidateModal(false);

    const electionData = {
        name: election?.name ?? MOCK_ELECTION.name,
        description: election?.description ?? MOCK_ELECTION.description,
        // Le back n'envoie pas encore de catégorie
        category: MOCK_ELECTION.category,
    };

    const status = election
        ? {
            label: computeElectionStatusLabel(election.begin_date, election.end_date),
            startDate: FormatDate.fromIsoToString(election.begin_date),
            endDate: FormatDate.fromIsoToString(election.end_date),
        }
        : MOCK_STATUS;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Détails de l'Élection</h1>
                <div className="flex items-center gap-2">
                    <Button variant="primary" onClick={() => openCandidateModal()}>
                        Candidater à l'Élection
                    </Button>
                    <Button variant="secondary">
                        <Settings size={15} />
                        Modifier l'Élection
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Colonne principale */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <ElectionOverview election={electionData} />
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
                        status={status.label}
                        startDate={status.startDate}
                        endDate={status.endDate}
                        onViewCalendar={() => console.log("Voir le calendrier")}
                    />
                </div>

            </div>

            {isCandidateModal && (
                <CandidatureFormPage
                    electionId={electionId}
                    handleModalClose={closeCandidateModal}
                />
            )}
        </div>
    );
}