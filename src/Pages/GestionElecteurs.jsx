import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const ITEMS_PER_PAGE = 10;

export default function GestionElecteurs() {
  const [electeurs, setElecteurs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    Nom: "",
    email: "",
    sexe: "",
    Date_de_naissance: "",
    is_elector: true,
    is_supervisor: false,
    is_candidate: true,
  });

  useEffect(() => {
    fetchElecteurs();
  }, []);

  const fetchElecteurs = async () => {
    const res = await axios.get("http://localhost:8000/api/v2/users/");
    setElecteurs(res.data);
    setTotal(res.data.length);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        await axios.post("http://localhost:8000/api/v2/users/", results.data);
        fetchElecteurs();
      },
    });
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:8000/api/v2/users/", formData);
    setFormData({
      Nom: "",
      email: "",
      sexe: "",
      Date_de_naissance: "",
      is_elector: true,
      is_supervisor: false,
      is_candidate: true,
    });
    fetchElecteurs();
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v2/users//${id}`);
    fetchElecteurs();
  };

  const paginated = electeurs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Électeurs</h1>

      {/* Statistiques */}
      <p className="mb-4 text-gray-700">
        Nombre total d'électeurs : <strong>{total}</strong>
      </p>

      {/* Formulaire d'ajout */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom"
          className="border p-2"
          value={formData.Nom}
          onChange={(e) => setFormData({ ...formData, Nom: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="checkbox"
          checked={formData.is_elector}
          onChange={(e) =>
            setFormData({ ...formData, is_elector: e.target.checked })
          }
        />

        <input
          type="checkbox"
          checked={formData.is_supervisor}
          onChange={(e) =>
            setFormData({ ...formData, is_supervisor: e.target.checked })
          }
        />
        <input
          type="checkbox"
          checked={formData.is_candidate}
          onChange={(e) =>
            setFormData({ ...formData, is_candidate: e.target.checked })
          }
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2"
        >
          Ajouter
        </button>
      </div>

      {/* Import CSV */}
      <div className="mb-4">
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
      </div>

      {/* Tableau des électeurs */}
      <table className="min-w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">sexe</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((el, i) => (
            <tr key={i}>
              <td className="border p-2">{el.nom}</td>
              <td className="border p-2">{el.email}</td>
              <td className="border p-2">{el.sexe}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(el._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2">
        {Array.from({ length: Math.ceil(total / ITEMS_PER_PAGE) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
