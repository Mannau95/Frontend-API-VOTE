import React, {useEffect, useState} from "react";
import {httpAxiosClient} from "../../client/httpClient.js";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../../store/electionSlice.js";
import {Eye, Pen, Trash} from "lucide-react";
import CustomTable from "../../Components/table/CustomTable.jsx";
import TablePagination from "../../Components/table/TablePagination.jsx";
import {FormatDate} from "../../utils/formatDate.js";
import CreerVotePage from "../CreerVotePage.jsx";
import Card from "../../Components/ui/Card.jsx";

const AdminElectionPage = () => {
    const [tab, setTab] = useState(0); // enCours = 0 | terminees = 1
    const [stats, setStats] = useState({});
    const {elections, loading, error} = useSelector(state => state.elections);
    const [filtered, setFiltered] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const dispatch = useDispatch()
    const [isEelectionModal, setIsEelectionModal] = useState(false);
    const openElectionModal = () => setIsEelectionModal(true);
    const closeElectionModal = () => setIsEelectionModal(false);

    const CHOICES = {
        "ADD": "ADD",
        "EDIT": "EDIT",
        "DELETE": "DELETE",
        "VIEW": "VIEW",
    }

    const columns = [
        {title: "Titre", code: "name"},
        {title: "Description", code: "description"},
        {title: "Date de début", code: "begin_date",
            render: (row) => (<span className="font-medium">{FormatDate.fromIsoToString(row.begin_date)}</span>)
        },
        {title: "Date de fin", code: "end_date",
            render: (row) => (<span className="font-medium">{FormatDate.fromIsoToString(row.end_date)}</span>)
        },
        {title: "Statut", code: "is_active",
            render: (row) => ( <span className="text-center">{row?.is_active ? "Actif" : "Terminé"}</span>)
        },
        {title: "Actions", code: "actions",
            render: (row) => (
                <div>
                    <Link to={":id/details".replace(":id", row.id)}>
                        <button onClick={() => {}} className="text-indigo-600 hover:text-indigo-700 p-1.5 mr-1">
                            <Eye size={16}/>
                        </button>
                    </Link>
                    <button
                        onClick={() => {}}
                        className="text-slate-500 hover:text-slate-700 p-1.5 mr-1"
                    >
                        <Pen size={16} />
                    </button>
                    <button
                        onClick={() => {
                            // handleDelete(row.id)
                        }}
                        className="text-red-600 hover:text-red-700 p-1.5"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            )},
    ]

    const rows = filtered
    const [page, setPage] = useState(1);
    const [paginatedRows, setPaginatedRows] = useState(rows.slice(0, 9));

    useEffect(() => {
        // Récupérer élections en cours ou terminées
        fetchElects();
    }, []);

    useEffect(() => {
        if (elections) {
            const data = tab === 0 ? elections.filter(el => Date.parse(el.begin_date) >= Date.now()) : elections.filter(el => Date.parse(el.begin_date) < Date.now())
            setFiltered(data);
        }

    }, [tab])

    const fetchElects = () => {
        dispatch(fetchElections()).unwrap()
            .then((res) => {
                setFiltered(res)
                setSelectedElection(null);
                setStats({
                    "totalElections": res.length,
                })
            });
    };

    const handleSelectElection = (election) => {
        httpAxiosClient
            .get(`elections/${election.id}/`)
            .then((res) => {
                setSelectedElection({...election, stats: res.data});
            });
    };

    const envoyerResultatsParMail = () => {
        if (!selectedElection) return;
        httpAxiosClient
            .post(
                `elections/${selectedElection.id}`
            )
            .then(() => alert("Emails envoyés avec succès"))
            .catch(() => alert("Échec de l'envoi des mails"));
    };

    return (
        <div className="space-y-8 w-full">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                            tab === 0 ? "bg-indigo-600 text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                        }`}
                        onClick={() => setTab(0)}
                    >
                        Élections en cours
                    </button>

                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                            tab === 1 ? "bg-indigo-600 text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                        }`}
                        onClick={() => setTab(1)}
                    >
                        Élections terminées
                    </button>
                </div>
                <div className="flex-end">
                    <button
                        className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        onClick={() => openElectionModal()}
                    >
                        Créer une Election
                    </button>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="p-4">
                    <p className="text-slate-500 text-sm">Total Élections Créées</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalElections || 0}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-slate-500 text-sm">Total Inscrits</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalInscrits || 0}</p>
                </Card>
                <Card className="p-4">
                    <p className="text-slate-500 text-sm">Taux de participation moyen</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stats.tauxParticipation || 0}%</p>
                </Card>
            </div>

            {/* Liste des élections */}
            <div className="bg-white px-4 py-6 rounded-2xl ring-1 ring-slate-200 shadow-sm">
                {/* Message */}
                <div className="bg-indigo-50 p-6 rounded-2xl text-center text-slate-700 mb-6">
                    Merci d'utiliser notre plateforme de vote en ligne. Continuez à
                    organiser des élections sécurisées, transparentes et simples. Revenez
                    souvent !
                </div>

                <CustomTable rows={rows} columns={columns} />

                <TablePagination rows={rows} currentPage={page} setPage={setPage} setPaginatedRows={setPaginatedRows} />
            </div>


            {/*<div className="grid grid-cols-2 md:grid-cols-5 gap-x-3 space-y-3">*/}
            {/*    {filtered.map((election) => (*/}
            {/*        <div*/}
            {/*            key={election.id}*/}
            {/*            // className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50"*/}
            {/*            onClick={() => handleSelectElection(election)}*/}
            {/*        >*/}
            {/*            <ElectionCard election={election} btnTitle="Voir détails"/>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Détails sélectionnés */}
            {selectedElection && (
                <div className="mt-10 p-6 bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">{selectedElection.titre}</h2>
                    {tab === "enCours" ? (
                        <>
                            <p>Nombre d'inscrits: {selectedElection.stats.inscrits}</p>
                            <p>Nombre de votes: {selectedElection.stats.votants}</p>
                            <p>
                                Taux de participation: {selectedElection.stats.participation}%
                            </p>
                            <p>Marge gagnant: {selectedElection.stats.marge}%</p>
                        </>
                    ) : (
                        <>
                            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                                {/* Graphique de répartition fictif */}
                                <p>Graphique de répartition des votes (placeholder)</p>
                            </div>
                            <table className="w-full mt-4 text-sm">
                                <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="p-2 text-left font-medium">Candidat</th>
                                    <th className="p-2 text-left font-medium">Votes</th>
                                    <th className="p-2 text-left font-medium">%</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedElection?.stats?.resultats?.map((c) => (
                                    <tr key={c.id} className="border-t border-slate-100">
                                        <td className="p-2 text-slate-700">{c.nom}</td>
                                        <td className="p-2 text-slate-700">{c.votes}</td>
                                        <td className="p-2 text-slate-700">{c.pourcentage}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    <button
                        onClick={envoyerResultatsParMail}
                        className="mt-4 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Envoyer les résultats par mail
                    </button>
                </div>
            )}

            {
                isEelectionModal && (
                    <CreerVotePage handleModalClose={closeElectionModal}/>
                )
            }
        </div>
    );
};

export default AdminElectionPage;
