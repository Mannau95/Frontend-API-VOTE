import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminElectionPage = () => {
  const [tab, setTab] = useState("enCours"); // enCours | terminees
  const [stats, setStats] = useState({});
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
    // Récupérer stats globales
    axios.get("/api/elections/stats").then((res) => setStats(res.data));

    // Récupérer élections en cours ou terminées
    fetchElections(tab);
  }, [tab]);

  const fetchElections = (type) => {
    axios.get(`/api/elections?etat=${type}`).then((res) => {
      setElections(res.data);
      setSelectedElection(null);
    });
  };

  const handleSelectElection = (election) => {
    axios.get(`/api/elections/${election.id}/stats`).then((res) => {
      setSelectedElection({ ...election, stats: res.data });
    });
  };

  const envoyerResultatsParMail = () => {
    if (!selectedElection) return;
    axios
      .post(`/api/elections/${selectedElection.id}/envoyer-mails`)
      .then(() => alert("Emails envoyés avec succès"))
      .catch(() => alert("Échec de l'envoi des mails"));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Onglets */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "enCours" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("enCours")}
        >
          Élections en cours
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "terminees" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("terminees")}
        >
          Élections terminées
        </button>
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

      {/* Message */}
      <div className="bg-blue-50 p-6 rounded shadow text-center text-gray-700">
        Merci d'utiliser notre plateforme de vote en ligne. Continuez à
        organiser des élections sécurisées, transparentes et simples. Revenez
        souvent !
      </div>

      {/* Liste des élections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {elections.map((election) => (
          <div
            key={election.id}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectElection(election)}
          >
            <img
              src={election.image || "/default.jpg"}
              alt="image"
              className="w-full h-32 object-cover mb-3 rounded"
            />
            <h3 className="text-xl font-semibold">{election.titre}</h3>
            <p className="text-sm text-gray-600">{election.description}</p>
          </div>
        ))}
      </div>

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
                  {selectedElection.stats.resultats.map((c) => (
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

          {/* Bouton pour envoyer les résultats par mail */}
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
