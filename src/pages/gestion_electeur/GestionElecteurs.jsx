import React, { useEffect, useState } from "react";
import { httpAxiosClient } from "../../client/httpClient.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchElectors} from "../../store/userSlice.js";
import SearchBar from "../../Components/SearchBar.jsx";
import Button from "../../Components/Button.jsx";
import {CloudUpload} from "lucide-react";
import AjoutElecteur from "./components/AjoutElecteur.jsx";
import ImportElecteurs from "./components/ImportElecteurs.jsx";

const ITEMS_PER_PAGE = 10;

export default function GestionElecteurs() {
  const [page, setPage] = useState(1);
  const { electors, loading, error } = useSelector(state => state.user);
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
  const dispatch = useDispatch();

  const [choice, setChoice] = useState("");
  const CHOICES = {
      "ADD": "ADD",
      "EDIT": "EDIT",
      "DELETE": "DELETE",
      "IMPORT": "IMPORT",
  }

  // const [file, setFile] = useState(null);
  // const [message, setMessage] = useState("");

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!file) {
  //     setMessage("Veuillez sélectionner un fichier.");
  //     return;
  //   }
  //
  //   const formData = new FormData();
  //   formData.append("file", file);
  //
  //   try {
  //     await httpAxiosClient.post("/users/import", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setMessage("Fichier importé avec succès !");
  //   } catch (error) {
  //     setMessage("Erreur lors de l'importation.", error);
  //   }
  // };

  // const handleAdd = async () => {
  //   await httpAxiosClient.post("/users/", formData);
  //   setFormData({
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     sex: "",
  //     birth_date: "",
  //     is_elector: true,
  //     is_supervisor: false,
  //     is_candidate: true,
  //   });
  // };

  const handleDelete = async (pk) => {
    await httpAxiosClient.delete(`/users/${pk}/`);
  };

  const handleEdit = async (pk) => {
    await httpAxiosClient.patch(`/users/${pk}/`, formData);
  };

    useEffect(() => {
        dispatch(fetchElectors()).unwrap()
            .then((data) => {
                // console.log("User data fetched successfully:", data.data);
                setTotal(data.length);
                // console.log("electors", electeurs)
            })
    }, []);

  return (
    <div className=" w-full flex flex-col ">
      <h1 className="text-2xl font-bold mb-4">Gestion des Électeurs</h1>
      <div className="py-2 flex justify-between items-center">
          <div className="flex space-x-2">
              <Button onClick={() => {
                  setChoice(CHOICES.ADD)
              }} >
                  <CloudUpload size={15}/>
                  Ajouter Electeur
              </Button>

              <Button className=" border-0 bg-blue-500 text-white" onClick={() => setChoice(CHOICES.IMPORT)} >
                  <CloudUpload size={15}/>
                  Importer Electeurs
              </Button>
          </div>
          <div>
            <SearchBar/>
          </div>
      </div>

      {/* Statistiques */}
      <p className="mb-4 text-gray-700">
        Nombre total d'électeurs : <strong>{total}</strong>
      </p>

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
          { electors && electors.map((el, i) => (
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

        {
            choice === CHOICES.ADD && (
                <AjoutElecteur handleModalClose={() =>setChoice("")}/>
            )
        }

        {
            choice === CHOICES.IMPORT && (
                <ImportElecteurs handleModalClose={() =>setChoice("")}/>
            )
        }
    </div>
  );
}
