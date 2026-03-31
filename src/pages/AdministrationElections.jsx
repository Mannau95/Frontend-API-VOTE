import React, {useEffect, useState} from "react";
import {httpAxiosClient} from "../client/httpClient";
import ElectionCard from "../Components/ElectionCard";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../store/electionSlice.js";
import {Eye, Pen, Trash} from "lucide-react";
import CustomTable from "../Components/table/CustomTable.jsx";
import TablePagination from "../Components/table/TablePagination.jsx";
import {FormatDate} from "../utils/formatDate.js";

const AdminElectionPage = () => {
    const [tab, setTab] = useState(0); // enCours = 0 | terminees = 1
    const [stats, setStats] = useState({});
    const {elections, loading, error} = useSelector(state => state.elections);
    const [filtered, setFiltered] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const dispatch = useDispatch()

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
                    <button
                        onClick={() => {
                            // handleEdit(row.id)
                        }}
                        className=" text-white px-2 py-1 mr-2"
                    >
                        <Eye size={17} color={"#305DDD"}/>
                    </button>
                    <button
                        onClick={() => {
                            // handleEdit(row.id)
                        }}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                        <Pen size={16} />
                    </button>
                    <button
                        onClick={() => {
                            // handleDelete(row.id)
                        }}
                        className="bg-red-500 text-white px-2 py-1 mr-2"
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
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded cursor-pointer ${
                            tab === 0 ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setTab(0)}
                    >
                        Élections en cours
                    </button>

                    <button
                        className={`px-4 py-2 rounded cursor-pointer ${
                            tab === 1 ? "bg-green-600 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setTab(1)}
                    >
                        Élections terminées
                    </button>
                </div>
                <div className="flex-end">
                    <Link to="/supervision/">
                        <button
                            className={`px-4 py-2 rounded cursor-pointer ${
                                tab === 0 ? "bg-green-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            Créer une Election
                        </button>
                    </Link>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Total Élections Créées</p>
                    <p className="text-2xl font-bold">{stats.totalElections || 0}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Total Inscrits</p>
                    <p className="text-2xl font-bold">{stats.totalInscrits || 0}</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Taux de participation moyen</p>
                    <p className="text-2xl font-bold">{stats.tauxParticipation || 0}%</p>
                </div>
            </div>

            {/* Liste des élections */}
            <div className="bg-white px-4 py-6" >
                {/* Message */}
                <div className="bg-blue-50 p-6 rounded shadow text-center text-gray-700 mb-6">
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
                <div className="mt-10 p-6 bg-white shadow rounded space-y-4">
                    <h2 className="text-2xl font-bold">{selectedElection.titre}</h2>
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
                            <table className="w-full mt-4 border">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2">Candidat</th>
                                    <th className="p-2">Votes</th>
                                    <th className="p-2">%</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedElection?.stats?.resultats?.map((c) => (
                                    <tr key={c.id}>
                                        <td className="p-2">{c.nom}</td>
                                        <td className="p-2">{c.votes}</td>
                                        <td className="p-2">{c.pourcentage}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    <button
                        onClick={envoyerResultatsParMail}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Envoyer les résultats par mail
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminElectionPage;
