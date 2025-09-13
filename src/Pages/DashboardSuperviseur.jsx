import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBarToggle from "../Components/SideBarToggle";


const DashboardSuperviseur = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/Connexion");
    }
  }, [navigate]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState("tous");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [eligibles, setEligibles] = useState([]);

  const [formData, setFormData] = useState({
    titre: "",
    organisation: "",
    description: "",
    systemeVote: "anonyme",
    jourVote: "",
    heureDebut: "",
    heureFin: "",
  });

  useEffect(() => {
    axios
      .get("https://ton-backend.com/api/utilisateurs")
      .then((res) => {
        setUtilisateurs(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
      });
  }, []);

  const toggleUtilisateur = (id) => {
    setEligibles((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      utilisateursEligibles: selectionMode === "tous" ? "tous" : eligibles,
    };

    axios
      .post("https://ton-backend.com/api/electeurs", payload)
      .then(() => alert("Vote créé avec succès"))
      .catch(() => alert("Erreur lors de la création du vote"));
  };

  return (
    <div>

      <SideBarToggle />
      <div className="min-h-screen flex flex-col items-center justify-center p-8 ">
      {!formVisible ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-center mb-4 text-red-500">
              Créez un nouveau vote en ligne
            </h1>
            <p className="text-center text-gray-600 mb-6 max-w-xl">
              Lancez facilement une élection en définissant les informations
              essentielles : titre, date, heure, système de vote et électeurs.
            </p>
            <button 
              onClick={() => setFormVisible(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            > 

      {/*<DashbordToggle />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        */}
              Créer un vote
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white text-black p-6 rounded shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-red-400">
              Formulaire de création de vote
            </h3>

            <div className="mb-4">
              <label className="block font-medium">Titre du vote *</label>
              <input
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block font-medium">Jour du vote</label>
                <input
                  type="date"
                  name="jourVote"
                  value={formData.jourVote}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Début</label>
                <input
                  type="time"
                  name="heureDebut"
                  value={formData.heureDebut}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Fin</label>
                <input
                  type="time"
                  name="heureFin"
                  value={formData.heureFin}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium">Groupe / Organisation</label>
              <input
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <div className="mb-4">
                <label className="block font-medium">Système de vote</label>
                <select
                  name="systemeVote"
                  value={formData.systemeVote}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="anonyme">Vote Anonyme</option>
                  <option value="non_anonyme">Vote Non Anonyme</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium">Électeurs éligibles</label>
                <div className="flex gap-4 mb-2">
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
                    Sélectionner les utilisateurs
                  </label>
                </div>

                {selectionMode === "selection" && (
                  <div className="max-h-40 overflow-y-auto border p-2 rounded grid grid-cols-2 gap-2">
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
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DashboardSuperviseur;

