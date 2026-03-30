import React, {useEffect, useState} from "react";
import {httpAxiosClient} from "../../client/httpClient.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchElectors} from "../../store/userSlice.js";
import SearchBar from "../../Components/SearchBar.jsx";
import Button from "../../Components/Button.jsx";
import {CloudUpload, Pen, Trash} from "lucide-react";
import AjoutElecteur from "./components/AjoutElecteur.jsx";
import ImportElecteurs from "./components/ImportElecteurs.jsx";
import CustomSelect from "../../Components/input/CustomSelect.jsx";
import CustomTable from "../../Components/CustomTable.jsx";

const ITEMS_PER_PAGE = 10;

export default function GestionElecteurs() {
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [electionsOptions, setElectionsOptions] = useState([]);
    const statusList = [
        {
            label: "Actif",
            value: true,
        }, {
            label: "Inactif",
            value: false,
        }
    ]
    const [page, setPage] = useState(1);
    const {electors, loading, error} = useSelector(state => state.user);
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

    const columns = [
        {title: "Nom", code: "first_name"},
        {title: "Prénom", code: "last_name"},
        {title: "Email", code: "email"},
        {title: "Sexe", code: "sex"},
        {title: "Statut", code: "is_active",
            render: (row) => ( <span className="text-center">{row?.is_active ? "Actif" : "Inactif"}</span>)
        },
        {title: "Actions", code: "actions",
            render: (row) => (
                <div>
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                        <Pen size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            )},
    ]

    const rows = electors

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
            <div className="py-2 flex justify-between items-center mt-5">
                <div className="flex space-x-2">
                    <Button onClick={() => {
                        setChoice(CHOICES.ADD)
                    }}>
                        <CloudUpload size={15}/>
                        Ajouter Electeur
                    </Button>

                    <Button className=" border-0 bg-blue-500 text-white" onClick={() => setChoice(CHOICES.IMPORT)}>
                        <CloudUpload size={15}/>
                        Importer Electeurs
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <SearchBar placeholder="Rechercher un électeur" className="w-full" />
                    <CustomSelect
                        placeholder="Filtre par statut"
                        value={selectedStatus}
                        onChange={(value) => setSelectedStatus(value)}
                        options={statusList} />
                </div>
            </div>

            {/* Statistiques */}
            <p className="mb-4 text-gray-700 mt-4 mb-30">
                Nombre total d'électeurs : <strong>{total}</strong>
            </p>

            {/* Tableau des électeurs */}
            <CustomTable rows={rows} columns={columns} />

            {/* Pagination */}
            <div className="flex gap-2 pt-6">
                {Array.from({length: Math.ceil(total / ITEMS_PER_PAGE)}, (_, i) => (
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
                    <AjoutElecteur handleModalClose={() => setChoice("")}/>
                )
            }

            {
                choice === CHOICES.IMPORT && (
                    <ImportElecteurs handleModalClose={() => setChoice("")}/>
                )
            }
        </div>
    );
}
