import React, {useState, useEffect} from "react";
import {httpAxiosClient} from "../../client/httpClient.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../../store/electionSlice.js";
import CandidaturesFilterBar from "./CandidaturesFilterBar.jsx";

function GestionCandidatures() {
    // const [elections, setElections] = useState([]);
    const {elections, loading, error} = useSelector(state => state.elections);
    // const [selectedElection, setSelectedElection] = useState(null);
    const [candidats, setCandidats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [loadingElections, setLoadingElections] = useState(false);
    const [loadingCandidats, setLoadingCandidats] = useState(false);
    const PAGE_SIZE = 5;
    const dispatch = useDispatch();

    // Charger les élections créées par l'utilisateur
    useEffect(() => {
        loadElections();
    }, []);

    const loadElections = async () => {
        dispatch(fetchElections()).unwrap()
        // setLoadingElections(true);
        // try {
        //   const res = await httpAxiosClient.get("/elections/");
        //   // Filtrer les élections démarrées (à enlever)
        //   const filtered = res.data.data.filter((e) => Date.parse(e.begin_date) > Date.now());
        //   setElections(filtered);
        // } catch (error) {
        //   console.error("Erreur chargement élections", error);
        // }
        // setLoadingElections(false);
    };

    // Charger les candidats pour une élection donnée
    const loadCandidats = async (electionId) => {
        setLoadingCandidats(true);
        try {
            const res = await httpAxiosClient.get(`elections/${electionId}/candidats/`);
            setCandidats(res.data);
            // setSelectedElection(electionId);
            setCurrentPage(1);
        } catch (error) {
            console.error("Erreur chargement candidats", error);
        }
        setLoadingCandidats(false);
    };

    // Approuver ou rejeter un candidat
    const handleDecision = async (candidatId, decision) => {
        try {
            await httpAxiosClient.post(`/candidats/${candidatId}/decision`, {
                statut: decision,
            });
            setCandidats((prev) =>
                prev.map((c) => (c.id === candidatId ? {...c, statut: decision} : c))
            );
        } catch (error) {
            console.error("Erreur mise à jour statut", error);
        }
    };

    // Pagination
    const totalPages = Math.ceil(candidats.length / PAGE_SIZE);
    const paginatedCandidats = candidats.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="p-6 flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6">Gestion des Candidatures</h1>

            {/* Liste élections */}
            <div className=" gap-6 mb-8">

                <div className=" px-6 py-4 bg-gray-50 min-h-[80dvh]">
                    {/* ENTETE  */}
                    <h1 className="text-2xl font-semibold mb-6">
                        Filtrer et gerer les candidatures
                    </h1>

                    <CandidaturesFilterBar />

                    {/* Candidats */}
                    <div>

                        { loadingCandidats &&
                            (
                                <div className="flex w-full h-[70dvh]">
                                    <p className="m-auto">Chargement des candidats...</p>
                                </div>
                            )
                        }
                        {
                            !loadingCandidats && candidats.length === 0 && (
                            (
                                <div className="flex w-full h-[70dvh]">
                                    <p className="m-auto">Aucune candidature emise pour le moment.</p>
                                </div>
                            )
                        )}

                        {!loadingCandidats && candidats.length > 0 && (
                            <>
                                <table className="min-w-full table-auto border-collapse border border-gray-300 mb-6">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">
                                            Nom & Prénom
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Motivation
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">Statut</th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedCandidats.map((candidat) => (
                                        <tr
                                            key={candidat.id}
                                            className="text-center border border-gray-300"
                                        >
                                            <td className="border px-4 py-2">
                                                {candidat.nom} {candidat.prenom}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {candidat.motivation}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {candidat.statut ? candidat.statut : "En attente"}
                                            </td>
                                            <td className="border px-4 py-2 space-x-2">
                                                <button
                                                    disabled={candidat.statut === "Approuvé"}
                                                    onClick={() =>
                                                        handleDecision(candidat.id, "Approuvé")
                                                    }
                                                    className={`px-3 py-1 rounded text-white ${
                                                        candidat.statut === "Approuvé"
                                                            ? "bg-green-400 cursor-not-allowed"
                                                            : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                                >
                                                    Approuver
                                                </button>
                                                <button
                                                    disabled={candidat.statut === "Rejeté"}
                                                    onClick={() => handleDecision(candidat.id, "Rejeté")}
                                                    className={`px-3 py-1 rounded text-white ${
                                                        candidat.statut === "Rejeté"
                                                            ? "bg-red-400 cursor-not-allowed"
                                                            : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                                >
                                                    Rejeter
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center space-x-3">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            Précédent
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-3 py-1 border rounded ${
                                                    currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GestionCandidatures;
