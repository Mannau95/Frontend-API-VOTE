import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Landmark, Mail, User, AlertCircle, Check, X } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";
import Badge from "../../Components/ui/Badge.jsx";
import Button from "../../Components/ui/Button.jsx";
import Modal from "../../Components/Modal.jsx";
import { InfoRow } from "../../Components/ui/InfoRow.jsx";
import { fetchUserCandidatures, fetchElectors } from "../../store/userSlice.js";
import { fetchElections } from "../../store/electionSlice.js";
import { fetchCandidatures, reviewCandidature } from "../../store/candidatureSlice.js";
import { FormatDate } from "../../utils/formatDate.js";
import { getCandidatureStatus } from "../../utils/candidatureStatus.js";

const MARKDOWN_CLASSES = "text-sm text-gray-600 leading-relaxed " +
    "[&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-1.5 [&_h2:first-child]:mt-0 " +
    "[&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 " +
    "[&_blockquote]:border-l-2 [&_blockquote]:border-indigo-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-500";

function ReviewConfirmModal({ action, rejectMessage, onRejectMessageChange, onConfirm, onCancel, loading, error }) {
    const isApprove = action === "approve";

    return (
        <Modal handleModalClose={onCancel}>
            <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 w-full max-w-md p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isApprove ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                    }`}>
                        {isApprove ? <Check size={18} /> : <X size={18} />}
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">
                            {isApprove ? "Approuver la candidature" : "Rejeter la candidature"}
                        </h2>
                        <p className="text-xs text-gray-400">Cette action est irréversible.</p>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    {isApprove
                        ? "Êtes-vous sûr de vouloir approuver cette candidature ?"
                        : "Êtes-vous sûr de vouloir rejeter cette candidature ? Veuillez préciser le motif ci-dessous."}
                </p>

                {!isApprove && (
                    <textarea
                        value={rejectMessage}
                        onChange={(e) => onRejectMessageChange(e.target.value)}
                        placeholder="Motif du rejet…"
                        rows={3}
                        autoFocus
                        className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-2.5 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-xs text-red-600">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>
                        Annuler
                    </Button>
                    <Button
                        variant={isApprove ? "primary" : "danger"}
                        className={isApprove ? "bg-emerald-600 hover:bg-emerald-700 border-transparent" : ""}
                        onClick={onConfirm}
                        disabled={loading || (!isApprove && !rejectMessage.trim())}
                    >
                        {loading ? "Envoi en cours…" : isApprove ? "Confirmer l'approbation" : "Confirmer le rejet"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

function CandidatureDetail() {
    const { candidatureId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userCandidatures, electors, user: connectedUser } = useSelector((state) => state.user);
    const { elections } = useSelector((state) => state.elections);
    const { candidatures, loading: reviewLoading, error: reviewError } = useSelector((state) => state.candidatures);

    const isAdmin = !!connectedUser?.is_supervisor;
    const isElecteurPath = location.pathname.includes("electeur/candidatures");
    const canReview = isAdmin && !isElecteurPath;

    const [confirmAction, setConfirmAction] = useState(null); // null | "approve" | "reject"
    const [rejectMessage, setRejectMessage] = useState("");

    useEffect(() => {
        if (!elections.length) dispatch(fetchElections());
        if (isAdmin) {
            if (!candidatures.length) dispatch(fetchCandidatures());
            if (!electors.length) dispatch(fetchElectors());
        } else if (!userCandidatures.length) {
            dispatch(fetchUserCandidatures());
        }
    }, [isAdmin]);

    const candidature = isAdmin
        ? candidatures.find((c) => String(c.id) === String(candidatureId))
        : userCandidatures.find((c) => String(c.id) === String(candidatureId));

    const election = elections.find((e) => String(e.id) === String(candidature?.election));
    const status = getCandidatureStatus(candidature);

    const candidateUser = isAdmin
        ? electors.find((u) => u.id === candidature?.candidate)
        : connectedUser;

    const backPath = isAdmin ? "/supervision/candidats/" : "/electeur/candidatures/";
    const backLabel = isAdmin ? "Gestion des candidatures" : "Mes candidatures";

    const closeConfirmModal = () => {
        setConfirmAction(null);
        setRejectMessage("");
    };

    const handleConfirmReview = async () => {
        try {
            if (confirmAction === "approve") {
                await dispatch(reviewCandidature({ candidatureId, status: "accepte", reject_message: "" })).unwrap();
            } else if (confirmAction === "reject") {
                if (!rejectMessage.trim()) return;
                await dispatch(reviewCandidature({
                    candidatureId,
                    status: "rejete",
                    reject_message: rejectMessage.trim(),
                })).unwrap();
            }

            if (isAdmin) {
                await dispatch(fetchCandidatures());
            } else {
                await dispatch(fetchUserCandidatures());
            }
            closeConfirmModal();
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut de la candidature.", err);
        }
    };

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
                        onClick={() => navigate(backPath)}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-1"
                    >
                        <ArrowLeft size={14} /> {backLabel}
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

                        {canReview && candidature.status === "en_attente" && (
                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <Button
                                    variant="primary"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-transparent"
                                    onClick={() => setConfirmAction("approve")}
                                    disabled={reviewLoading}
                                >
                                    <Check size={14} /> Approuver
                                </Button>
                                <Button
                                    variant="danger"
                                    className="flex-1"
                                    onClick={() => setConfirmAction("reject")}
                                    disabled={reviewLoading}
                                >
                                    <X size={14} /> Rejeter
                                </Button>
                            </div>
                        )}
                    </Card>

                    <Card className="p-5">
                        <SectionTitle>Candidat</SectionTitle>
                        <InfoRow
                            icon={User}
                            label="Nom :"
                            value={`${candidateUser?.first_name ?? ""} ${candidateUser?.last_name ?? ""}`.trim() || "—"}
                        />
                        <InfoRow icon={Mail} label="Email :" value={candidateUser?.email ?? "—"} />
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

            {confirmAction && (
                <ReviewConfirmModal
                    action={confirmAction}
                    rejectMessage={rejectMessage}
                    onRejectMessageChange={setRejectMessage}
                    onConfirm={handleConfirmReview}
                    onCancel={closeConfirmModal}
                    loading={reviewLoading}
                    error={reviewError}
                />
            )}
        </div>
    );
}

export default CandidatureDetail;
