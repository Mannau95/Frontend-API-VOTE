import React, { useEffect, useState } from "react";
import { httpAxiosClient } from "../client/httpClient";

const ITEMS_PER_PAGE = 10;

export default function GestionElecteurs() {
  const [electeurs, setElecteurs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    sex: "",
    birth_date: "",
    is_elector: true,
    is_supervisor: false,
    is_candidate: true,
  });

  useEffect(() => {
    fetchElecteurs();
  }, []);

  const fetchElecteurs = async () => {
    httpAxiosClient
      .get("/users/")
      .then((data) => {
        console.log("User data fetched successfully:", data.data);
        if (data.data.succes) {
          setElecteurs(data.data.data.data);
        }
        setTotal(data.data.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Veuillez sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await httpAxiosClient.post("/users/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Fichier importé avec succès !");
    } catch (error) {
      setMessage("Erreur lors de l'importation.", error);
    }
    setLoading(false);
    fetchElecteurs();
  };

  const handleAdd = async () => {
    await httpAxiosClient.post("/users/", formData);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      sex: "",
      birth_date: "",
      is_elector: true,
      is_supervisor: false,
      is_candidate: true,
    });
    fetchElecteurs();
  };
  const handleDelete = async (pk) => {
    await httpAxiosClient.delete(`/users/${pk}/`);
    fetchElecteurs();
  };

  const handleEdit = async (pk) => {
    await httpAxiosClient.patch(`/users/${pk}/`, formData);
    fetchElecteurs();
  };

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Gestion des Électeurs</h1>

      {/* Statistiques */}
      <p className="mb-4 text-gray-700">
        Nombre total d'électeurs : <strong>{total}</strong>
      </p>

      {/* Formulaire d'ajout */}
      <div className=" gap-2 mb-4">
        <label htmlFor="Nom">Ajouter un Électeur:</label>

        <div>
          <form action="">
            <div className=" my-2 p-4 flex flex-col gap-3">
              <input
                required
                type="text"
                placeholder="Nom"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />

              <input
                required
                type="text"
                placeholder="Prénom"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />

              <input
                required
                type="email"
                placeholder="Email"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <select
                required
                id="sexe"
                name="sexe"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, sex: e.target.value })
                }
              >
                <option value="">Sexe...</option>
                <option value="homme">H</option>
                <option value="femme">F</option>
              </select>

              <input
                required
                type="date"
                placeholder=" Date d'anniversaire"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.birth_date}
                onChange={(e) =>
                  setFormData({ ...formData, birth_date: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 my-3">
              <div>
                <label
                  required
                  htmlFor="is_elector"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  Électeur
                </label>
                <input
                  type="checkbox"
                  checked={formData.is_elector}
                  onChange={(e) =>
                    setFormData({ ...formData, is_elector: e.target.checked })
                  }
                />
              </div>
              <div>
                <label
                  required
                  htmlFor="is_supervisor"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {" "}
                  Superviseur{" "}
                </label>
                <input
                  type="checkbox"
                  checked={formData.is_supervisor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_supervisor: e.target.checked,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="is_candidate"
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {" "}
                  Candidat{" "}
                </label>
                <input
                  type="checkbox"
                  checked={formData.is_candidate}
                  onChange={(e) =>
                    setFormData({ ...formData, is_candidate: e.target.checked })
                  }
                />
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>

      {/* Import CSV */}

      <div className="flex justify-center items-center mb-10 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <label className="block mb-4 text-lg font-semibold">
            Importer le fichier des électeurs
          </label>

          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
            className="w-full border border-black px-4 py-2 mb-4"
            placeholder="Choisir un fichier"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Valider"}
          </button>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </form>
      </div>

      {/* Tableau des électeurs */}
      <table className="min-w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">sexe</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {electeurs.map((el, i) => (
            <tr key={i}>
              <td className="border p-2">{el.first_name}</td>
              <td className="border p-2">{el.last_name}</td>
              <td className="border p-2">{el.email}</td>
              <td className="border p-2">{el.sex}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(el._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handleEdit(el._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  Modifier
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
