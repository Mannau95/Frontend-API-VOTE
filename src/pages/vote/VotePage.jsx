// VotePage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronUp, CheckCircle2, Loader2 } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import Button from "../../Components/ui/Button.jsx";
import { httpAxiosClient } from "../../client/httpClient.js";
import { fetchElections } from "../../store/electionSlice.js";

function CandidatCard({ candidat, selected, onSelect }) {
    const [open, setOpen] = useState(false);

    return (
        <Card
            className={`p-5 flex flex-col items-center gap-3 cursor-pointer transition-all ${
                selected
                    ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/40"
                    : "hover:border-gray-300"
            }`}
            onClick={onSelect}
        >
            <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-semibold border-2 border-white shadow">
                {candidat.candidate_name?.charAt(0) ?? "?"}
            </div>

            <div className="text-center">
                <p className={`text-sm font-semibold ${selected ? "text-indigo-700" : "text-gray-900"}`}>
                    {candidat.candidate_name}
                </p>
            </div>

            {candidat.description && (
                <>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                        className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Programme du candidat
                        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {open && (
                        <p className="text-xs text-gray-600 text-center leading-relaxed border-t border-gray-100 pt-3 w-full">
                            {candidat.description}
                        </p>
                    )}
                </>
            )}

            <label
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-1"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="radio"
                    name="candidat"
                    value={candidat.id}
                    checked={selected}
                    onChange={onSelect}
                    className="accent-indigo-600 w-4 h-4"
                />
                Sélectionner
            </label>
        </Card>
    );
}

// Fetches every page of the candidates list (backend paginates a handful per page).
async function fetchAllCandidates(electionId) {
    let url = `/elections/${electionId}/candidates/`;
    let rows = [];
    while (url) {
        const res = await httpAxiosClient.get(url);
        rows = rows.concat(res.data?.data?.data ?? []);
        url = res.data?.data?.next ?? null;
    }
    return rows;
}

export default function VotePage() {
    const { electionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { elections } = useSelector((state) => state.elections);
    const election = elections.find((e) => String(e.id) === String(electionId));

    const [candidats, setCandidats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [selected, setSelected] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!elections.length) dispatch(fetchElections());
    }, []);

    useEffect(() => {
        setLoading(true);
        setLoadError("");
        fetchAllCandidates(electionId)
            .then(setCandidats)
            .catch((error) => setLoadError(error.message || "Impossible de charger les candidats."))
            .finally(() => setLoading(false));
    }, [electionId]);

    const onSubmit = () => {
        if (!selected) return;
        setSubmitting(true);
        setSubmitError("");
        httpAxiosClient
            .post("/votes/", { election: electionId, candidate: selected, date_vote: new Date().toISOString() })
            .then(() => setSubmitted(true))
            .catch((error) => setSubmitError(error.message || "Le vote n'a pas pu être enregistré."))
            .finally(() => setSubmitting(false));
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
                <Card className="p-8 max-w-md text-center flex flex-col items-center gap-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    <h1 className="text-lg font-bold text-gray-900">Votre vote a bien été enregistré</h1>
                    <p className="text-sm text-gray-500">Merci pour votre participation. Votre vote est définitif et ne peut plus être modifié.</p>
                    <Button variant="primary" onClick={() => navigate("../../elections")}>
                        Retour aux élections
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">

                <h1 className="text-2xl font-bold text-gray-900">
                    Voter pour : {election?.name ?? "Élection"}
                </h1>

                {election?.description && (
                    <Card className="p-5 flex flex-col gap-3">
                        <h2 className="text-sm font-semibold text-gray-800">Détails de l'Élection</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">{election.description}</p>
                    </Card>
                )}

                <div>
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Candidats</h2>

                    {loading && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 py-10 justify-center">
                            <Loader2 className="w-4 h-4 animate-spin" /> Chargement des candidats...
                        </div>
                    )}

                    {!loading && loadError && (
                        <p className="text-sm text-red-600 text-center py-10">{loadError}</p>
                    )}

                    {!loading && !loadError && candidats.length === 0 && (
                        <p className="text-sm text-slate-500 text-center py-10">
                            Aucun candidat n'a encore été validé pour cette élection.
                        </p>
                    )}

                    {!loading && !loadError && candidats.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidats.map((c) => (
                                <CandidatCard
                                    key={c.id}
                                    candidat={c}
                                    selected={selected === c.id}
                                    onSelect={() => setSelected(c.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {submitError && (
                    <p className="text-sm text-red-600 text-center">{submitError}</p>
                )}

                {!loading && !loadError && candidats.length > 0 && (
                    <div className="flex justify-center pb-4">
                        <Button
                            variant="primary"
                            disabled={!selected || submitting}
                            onClick={onSubmit}
                            className="px-8 py-2.5"
                        >
                            {submitting ? "Envoi en cours..." : "Soumettre mon vote"}
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
