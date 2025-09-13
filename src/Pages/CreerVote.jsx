import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashbordToggle from "../Components/DashbordToggle";
import { useState } from "react";

function CréerUnVote() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/Connexion");
    }
  }, [navigate]);

  const utilisateurs = [
    { id: 1, nom: "Alice" },
    { id: 2, nom: "Bob" },
    { id: 3, nom: "Claire" },
    // Ajoute les autres ici
  ];

  const [formVisible, setFormVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState("tous");
  const [eligibles, setEligibles] = useState([]);

  const toggleUtilisateur = (id) => {
    setEligibles((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <DashbordToggle />
      <div className="min-h-screen flex flex-col items-center justify-center p-8 ">
        {!formVisible && (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              Créez un nouveau vote en ligne
            </h1>
            <p className="text-center text-gray-600 mb-6 max-w-xl">
              Lancez facilement une élection en définissant les informations
              essentielles : titre, date, heure, système de vote et électeurs.
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              onClick={() => setFormVisible(true)}
            >
              Créer un vote
            </button>
          </>
        )}

        {formVisible && (
          <form className="bg-black shadow-md rounded p-6 w-full max-w-2xl mt-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Informations du vote</h2>

            <input
              type="text"
              placeholder="Titre du vote"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Groupe ou organisation (optionnel)"
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Description du vote *"
              required
              className="w-full border p-2 rounded"
            />

            <div>
              <label className="block mb-2 font-medium">Système de vote</label>
              <select className="w-full border p-2 rounded">
                <option>Vote anonyme</option>
                <option>Vote non anonyme</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input type="date" className="border p-2 rounded" />
              <input type="time" className="border p-2 rounded" />
              <input type="time" className="border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Liste des électeurs
              </label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="selection"
                    value="tous"
                    checked={selectionMode === "tous"}
                    onChange={() => setSelectionMode("tous")}
                  />
                  Tous les utilisateurs
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="selection"
                    value="selection"
                    checked={selectionMode === "selection"}
                    onChange={() => setSelectionMode("selection")}
                  />
                  Sélectionner manuellement
                </label>
              </div>

              {selectionMode === "selection" && (
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                  {utilisateurs.map((user) => (
                    <label key={user.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={eligibles.includes(user.id)}
                        onChange={() => toggleUtilisateur(user.id)}
                      />
                      {user.nom}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Valider
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CréerUnVote;
