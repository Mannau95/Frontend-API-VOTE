// ElectionResultsElecteur.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2, Trophy, Clock } from "lucide-react";
import { httpAxiosClient } from "../../client/httpClient.js";
import Card from "../../Components/ui/Card.jsx";
import Button from "../../Components/ui/Button.jsx";
import ResultsBarChart from "../../Components/charts/ResultsBarChart.jsx";
import { resultsToCsv, downloadCsv } from "../../utils/exportCsv.js";

/**
 * Elector-facing results page — GET /elections/:id/results/.
 * The backend itself enforces "only after end_date" for electors (403 with
 * an explicit message), so a not-yet-available response is shown as an
 * informational state here, not as an error.
 */
export default function ElectionResultsElecteur() {
    const { electionId } = useParams();
    const navigate = useNavigate();
    // Best-effort only: elections may already be in the store from another
    // page (dashboard, elections list). No fetch triggered here just for a
    // filename — falls back to a generic name if not present yet.
    const { elections } = useSelector((state) => state.elections);
    const electionName = elections.find((e) => String(e.id) === String(electionId))?.name;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notYetAvailable, setNotYetAvailable] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setNotYetAvailable(false);
        httpAxiosClient
            .get(`/elections/${electionId}/results/`)
            .then((res) => {
                if (res.data?.succes) setData(res.data.data);
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    setNotYetAvailable(true);
                } else {
                    setError(err.message || "Impossible de charger les résultats.");
                }
            })
            .finally(() => setLoading(false));
    }, [electionId]);

    const exporterResultatsCsv = () => {
        const csv = resultsToCsv(data.results);
        const nomFichier = `resultats-${(electionName || `election-${electionId}`).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`;
        downloadCsv(nomFichier, csv);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5">
                <h1 className="text-2xl font-bold text-gray-900">Résultats de l'élection</h1>

                {loading && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 py-10 justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" /> Chargement des résultats...
                    </div>
                )}

                {!loading && notYetAvailable && (
                    <Card className="p-8 flex flex-col items-center gap-3 text-center">
                        <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-700" />
                        </div>
                        <p className="text-sm text-slate-600">
                            Les résultats ne sont disponibles qu'une fois l'élection terminée.
                        </p>
                        <Button variant="secondary" onClick={() => navigate(-1)}>Retour</Button>
                    </Card>
                )}

                {!loading && !notYetAvailable && error && (
                    <p className="text-sm text-red-600 text-center py-10">{error}</p>
                )}

                {!loading && !notYetAvailable && !error && data && (
                    <>
                        <Card className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500">Total des votes exprimés</p>
                                <p className="text-xl font-bold text-slate-900">{data.total_votes}</p>
                            </div>
                            {data.winner && (
                                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                                    <Trophy className="w-4 h-4" />
                                    <span className="text-sm font-medium">{data.winner.candidate_name}</span>
                                </div>
                            )}
                        </Card>

                        <Card className="p-5">
                            <h2 className="text-sm font-semibold text-slate-800 mb-3">Répartition des votes</h2>
                            <ResultsBarChart results={data.results} winnerId={data.winner?.candidate_id ?? null} />
                        </Card>

                        <div className="flex justify-center gap-3 pb-4">
                            <Button variant="secondary" disabled={!data.results?.length} onClick={exporterResultatsCsv}>
                                Exporter en CSV
                            </Button>
                            <Link to="/electeur/elections">
                                <Button variant="secondary">Retour aux élections</Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
