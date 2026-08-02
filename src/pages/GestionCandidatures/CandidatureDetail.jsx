import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Landmark, Mail, User, AlertCircle } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";
import Badge from "../../Components/ui/Badge.jsx";
import { InfoRow } from "../../Components/ui/InfoRow.jsx";
import { fetchUserCandidatures } from "../../store/userSlice.js";
import { fetchElections } from "../../store/electionSlice.js";
import { FormatDate } from "../../utils/formatDate.js";
import { getCandidatureStatus } from "../../utils/candidatureStatus.js";

const MARKDOWN_CLASSES = "text-sm text-gray-600 leading-relaxed " +
    "[&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-1.5 [&_h2:first-child]:mt-0 " +
    "[&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 " +
    "[&_blockquote]:border-l-2 [&_blockquote]:border-indigo-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-500";

function CandidatureDetail() {
    const { candidatureId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userCandidatures } = useSelector((state) => state.user);
    const { elections } = useSelector((state) => state.elections);
    const connectedUser = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!userCandidatures.length) dispatch(fetchUserCandidatures());
        if (!elections.length) dispatch(fetchElections());
    }, []);

    const candidature = userCandidatures.find((c) => String(c.id) === String(candidatureId));
    const election = elections.find((e) => String(e.id) === String(candidature?.election));
    const status = getCandidatureStatus(candidature);

    if (!candidature) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-slate-500">Candidature introuvable ou en cours de chargement…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate("/electeur/candidatures/")}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-1"
                    >
                        <ArrowLeft size={14} /> Mes candidatures
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Détails de la candidature</h1>
                    <p className="text-sm text-gray-500">
                        {election?.name ?? `Élection #${candidature.election}`}
                    </p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Colonne principale */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <Card className="p-6">
                        <SectionTitle>Biographie & Motivation</SectionTitle>
                        <div className={MARKDOWN_CLASSES}>
                            <ReactMarkdown>{candidature.description}</ReactMarkdown>
                        </div>
                    </Card>

                    {status.variant === "danger" && candidature.reject_message && (
                        <Card className="p-6 ring-1 ring-red-100">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <h2 className="text-base font-semibold text-red-700">Motif du rejet</h2>
                            </div>
                            <p className="text-sm text-red-600 leading-relaxed">{candidature.reject_message}</p>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                    <Card className="p-5">
                        <SectionTitle>Statut de la candidature</SectionTitle>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500">Statut actuel :</span>
                            <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <InfoRow
                            icon={Calendar}
                            label="Déposée le :"
                            value={FormatDate.fromIsoToString(candidature.date_candidature)}
                        />
                    </Card>

                    <Card className="p-5">
                        <SectionTitle>Candidat</SectionTitle>
                        <InfoRow
                            icon={User}
                            label="Nom :"
                            value={`${connectedUser?.first_name ?? ""} ${connectedUser?.last_name ?? ""}`.trim() || "—"}
                        />
                        <InfoRow icon={Mail} label="Email :" value={connectedUser?.email ?? "—"} />
                    </Card>

                    <Card className="p-5">
                        <SectionTitle>Élection</SectionTitle>
                        <InfoRow icon={Landmark} label="Nom :" value={election?.name ?? "—"} />
                        <InfoRow
                            icon={Calendar}
                            label="Début :"
                            value={election ? FormatDate.fromIsoToString(election.begin_date) : "—"}
                        />
                        <InfoRow
                            icon={Calendar}
                            label="Fin :"
                            value={election ? FormatDate.fromIsoToString(election.end_date) : "—"}
                        />
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default CandidatureDetail;
