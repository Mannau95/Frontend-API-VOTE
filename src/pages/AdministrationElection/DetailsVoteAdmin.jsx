import React, {useEffect, useState} from 'react';
import {Settings, Loader2} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {httpAxiosClient} from "../../client/httpClient.js";
import {FormatDate} from "../../utils/formatDate.js";
import {computeElectionStatusLabel} from "../../utils/electionStatus.js";
import {fetchElections} from "../../store/electionSlice.js";
import ResultsBarChart from "../../Components/charts/ResultsBarChart.jsx";
import Card from "../../Components/ui/Card.jsx";
import Button from "../../Components/ui/Button.jsx";
import { resultsToCsv, downloadCsv } from "../../utils/exportCsv.js";

function DetailsVoteAdmin() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { elections } = useSelector( state => state.elections);
    const [election, setElection] = useState(null);

    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState("");
    const [sending, setSending] = useState(false);
    const [sendMessage, setSendMessage] = useState("");

    useEffect(() => {
        if (!elections.length) dispatch(fetchElections());
    }, []);

    useEffect( ()=> {
         setElection(elections.find( (e)=> e.id == id))
    }, [elections])

    useEffect(() => {
        setStatsLoading(true);
        setStatsError("");
        httpAxiosClient
            .get(`/elections/${id}/stats/`)
            .then((res) => {
                if (res.data?.succes) setStats(res.data.data);
            })
            .catch((error) => setStatsError(error.message || "Impossible de charger les statistiques."))
            .finally(() => setStatsLoading(false));
    }, [id]);

    const envoyerResultatsParMail = () => {
        setSending(true);
        setSendMessage("");
        httpAxiosClient
            .post(`/elections/${id}/send-results/`)
            .then((res) => setSendMessage(res.data?.details || "Résultats envoyés."))
            .catch((error) => setSendMessage(error.message || "Échec de l'envoi des mails."))
            .finally(() => setSending(false));
    };

    const winner = stats?.resultats?.length
        ? stats.resultats.reduce((a, b) => (b.votes > a.votes ? b : a))
        : null;

    const exporterResultatsCsv = () => {
        const csv = resultsToCsv(stats.resultats);
        const nomFichier = `resultats-${(election?.name || "election").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`;
        downloadCsv(nomFichier, csv);
    };

    return (
        <div>
            <div className="flex justify-between mb-8">
                <h2>Détails de l'Election</h2>

                <button className="btn bg-blue-500" onClick={() => navigate(`/supervision/elections/${id}/edit`)}>
                    <Settings size={16}/>
                    Modifier l'élection
                </button>
            </div>

            <div className="bg-white text-gray-600 ">
                <div className="flex px-4">
                    <div className="flex-2/3">
                        <div className="my-5 mx-2 px-8 py-5 border border-gray-100 rounded-lg text-2xs">
                            <h3>Aperçu</h3>
                            <h3>Nom de l'élection : {election?.name}</h3>
                            <p className="text-sm text-gray-600 font-medium">
                                {election?.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1/3">
                        <div className="my-5 mx-2 px-8 py-5 border border-gray-100 rounded-lg">
                            <h3>Statut & Dates</h3>
                            <div className="text-blue-500">Statut courant: <span>{election?.begin_date && computeElectionStatusLabel(election.begin_date, election.end_date)}</span></div>
                            <div>Date: {election?.begin_date && FormatDate.fromIsoToString(election.begin_date)}</div>
                            <div>Fin: {election?.end_date && FormatDate.fromIsoToString(election.end_date)}</div>
                        </div>
                    </div>

                </div>

                {/* Statistiques & résultats */}
                <div className="mx-4 mb-5 px-8 py-5 border border-gray-100 rounded-lg">
                    <h3 className="mb-3">Statistiques & résultats</h3>

                    {statsLoading && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                            <Loader2 className="w-4 h-4 animate-spin" /> Chargement des statistiques...
                        </div>
                    )}

                    {!statsLoading && statsError && (
                        <p className="text-sm text-red-600">{statsError}</p>
                    )}

                    {!statsLoading && !statsError && stats && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <Card className="p-3">
                                    <p className="text-xs text-slate-500">Inscrits</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.inscrits}</p>
                                </Card>
                                <Card className="p-3">
                                    <p className="text-xs text-slate-500">Votants</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.votants}</p>
                                </Card>
                                <Card className="p-3">
                                    <p className="text-xs text-slate-500">Participation</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.participation}%</p>
                                </Card>
                                <Card className="p-3">
                                    <p className="text-xs text-slate-500">Marge du vainqueur</p>
                                    <p className="text-xl font-bold text-slate-900">{stats.marge}%</p>
                                </Card>
                            </div>

                            <ResultsBarChart results={stats.resultats} winnerId={winner?.candidate_id} />

                            <table className="w-full mt-4 text-sm">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="p-2 text-left font-medium">Candidat</th>
                                        <th className="p-2 text-left font-medium">Votes</th>
                                        <th className="p-2 text-left font-medium">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.resultats.map((c) => (
                                        <tr key={c.candidate_id} className="border-t border-slate-100">
                                            <td className="p-2 text-slate-700">{c.candidate_name}</td>
                                            <td className="p-2 text-slate-700">{c.votes}</td>
                                            <td className="p-2 text-slate-700">{c.percentage}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex gap-3 mt-4">
                                <Button variant="primary" disabled={sending} onClick={envoyerResultatsParMail}>
                                    {sending ? "Envoi en cours..." : "Envoyer les résultats par mail"}
                                </Button>
                                <Button variant="secondary" disabled={!stats.resultats?.length} onClick={exporterResultatsCsv}>
                                    Exporter en CSV
                                </Button>
                            </div>
                            {sendMessage && <p className="text-sm text-slate-600 mt-2">{sendMessage}</p>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsVoteAdmin;
