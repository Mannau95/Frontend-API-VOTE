// ElectionDetailPage.jsx
import { Settings, Loader2 } from "lucide-react";
import { ElectionOverview } from "./ElectionOverview.jsx";
import { StatusSidebar } from "./StatusSidebar.jsx";
import Button from "../../Components/ui/Button.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchElections } from "../../store/electionSlice.js";
import { FormatDate } from "../../utils/formatDate.js";
import { computeElectionStatusLabel } from "../../utils/electionStatus.js";
import CandidatureFormPage from "../Candidatures/CandidatureFormPage.jsx";

export default function ElectionDetailPage() {
    const dispatch = useDispatch();
    const { electionId } = useParams();
    const { elections, loading } = useSelector((state) => state.elections);
    const [isCandidateModal, setIsCandidateModal] = useState(false);

    useEffect(() => {
        if (!elections.length) {
            dispatch(fetchElections());
        }
    }, []);

    const election = elections.find((e) => String(e.id) === String(electionId));

    const openCandidateModal = () => setIsCandidateModal(true);
    const closeCandidateModal = () => setIsCandidateModal(false);

    if (!election) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
                {loading ? (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Loader2 className="w-4 h-4 animate-spin" /> Chargement de l'élection...
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">Élection introuvable.</p>
                )}
            </div>
        );
    }

    const status = {
        label: computeElectionStatusLabel(election.begin_date, election.end_date),
        startDate: FormatDate.fromIsoToString(election.begin_date),
        endDate: FormatDate.fromIsoToString(election.end_date),
    };

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
                    <ElectionOverview election={election} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <StatusSidebar
                        status={status.label}
                        startDate={status.startDate}
                        endDate={status.endDate}
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
