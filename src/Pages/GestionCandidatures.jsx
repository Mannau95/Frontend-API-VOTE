import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 5;

function GestionCandidatures() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidats, setCandidats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingElections, setLoadingElections] = useState(false);
  const [loadingCandidats, setLoadingCandidats] = useState(false);

  // Charger les élections créées par l'utilisateur
  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    setLoadingElections(true);
    try {
      const res = await axios.get("/api/elections/mine"); // adapter l'URL backend
      // Filtrer les élections démarrées (à enlever)
      const filtered = res.data.filter((e) => !e.started);
      setElections(filtered);
    } catch (error) {
      console.error("Erreur chargement élections", error);
    }
    setLoadingElections(false);
  };

  // Charger les candidats pour une élection donnée
  const loadCandidats = async (electionId) => {
    setLoadingCandidats(true);
    try {
      const res = await axios.get(`/api/elections/electionId/candidats`);
      setCandidats(res.data);
      setSelectedElection(electionId);
      setCurrentPage(1);
    } catch (error) {
      console.error("Erreur chargement candidats", error);
    }
    setLoadingCandidats(false);
  };

  // Approuver ou rejeter un candidat
  const handleDecision = async (candidatId, decision) => {
    try {
      await axios.post(`/api/candidats/${candidatId}/decision`, {
        statut: decision,
      });
      setCandidats((prev) =>
        prev.map((c) => (c.id === candidatId ? { ...c, statut: decision } : c))
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des Candidatures</h1>

      {/* Liste élections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {loadingElections && <p>Chargement des élections...</p>}
        {!loadingElections && elections.length === 0 && (
          <p>Aucune élection disponible.</p>
        )}
        {elections.map((election) => (
          <div
            key={election.id}
            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => loadCandidats(election.id)}
          >
            <h2 className="text-xl font-semibold">{election.titre}</h2>
            <p className="text-gray-600">{election.description}</p>
          </div>
        ))}
      </div>

      {/* Candidats */}
      {selectedElection && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Candidats pour l'élection
          </h2>

          {loadingCandidats && <p>Chargement des candidats...</p>}

          {!loadingCandidats && candidats.length === 0 && (
            <p>Aucun candidat pour cette élection.</p>
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
                        currentPage === i + 1 ? "bg-blue-500 text-white" : ""
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
      )}
    </div>
  );
}

export default GestionCandidatures;
