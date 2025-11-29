import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { httpAxiosClient } from "../client/httpClient";

export default function CreerVotePage() {
  const navigate = useNavigate();

  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectionMode, setSelectionMode] = useState("tous");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [eligibles, setEligibles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    begin_date: "",
    end_date: "",
  });

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
    setIsLoading(true)
    setErrorMsg(null)
    const payload = {
      ...formData
      // utilisateursEligibles: selectionMode === "tous" ? "tous" : eligibles,
    };
    console.log('create vote payload', payload);

    // const access = localStorage.getItem("access_token");

    httpAxiosClient
      .post("/elections/", payload)
      .then((data) => {
        // alert("Vote créé avec succès")
        console.log(data.status)
        if(data.status === 201){
          navigate('/supervision/elections/')
          
        } else {
          setErrorMsg("Erreur lors de la création du vote")
        }
      })
      .catch((e) => {
        const err = e.response.data[Object.keys(e.response.data)[0]];
        
        ///alert("Erreur lors de la création du vote")}
        setErrorMsg(err) //"Erreur lors de la création du vote")//JSON.stringify(e.response.data))
      })
      .finally(()=>{
        setIsLoading(false)
      })
  };

  return (
    <>
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
            Formulaire de création d'Election
          </h3>

          <div className="mb-4">
            <label className="block font-medium">Titre d'Election *</label>
            <input name="name" value={formData.name} onChange={handleChange} required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-medium">Date de début</label>
              <input type="datetime-local" name="begin_date" value={formData.begin_date} onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium">Date de fin</label>
              <input  type="datetime-local"  name="end_date"  value={formData.end_date} onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

          </div>

          {/* <div className="mb-4">
            <label className="block font-medium">Groupe / Organisation</label>
            <input
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div> */}

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">Description *</label>
            <textarea id='description' name="description" value={formData.description} onChange={handleChange} required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="my-3 text-xs text-red-500">
              {errorMsg? errorMsg: ''}
          </div>

          <div className="mb-4">
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setFormVisible(false)}
              >
                Annuler
              </button>

              <button type="submit" disabled={isLoading} className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded">
                Valider
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
