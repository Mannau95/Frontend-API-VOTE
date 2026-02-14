import React, {useState} from 'react';
import Modal from "../../../Components/Modal.jsx";
import {useDispatch} from "react-redux";
import {httpAxiosClient} from "../../../client/httpClient.js";

function AjoutElecteur({handleModalClose}) {
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

    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // formData.append("file", file);

        try {
            await httpAxiosClient.post("/users/import", formData, {
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            });
            setMessage("Fichier importé avec succès !");
        } catch (error) {
            setMessage("Erreur lors de l'importation.", error);
        }
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
    };
    return (
        <Modal handleModalClose={handleModalClose}>
            {/* Formulaire d'ajout */}
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md" >
                <div className=" gap-2 mb-4">
                    <label htmlFor="Nom">Ajouter un Électeur:</label>

                    <div>
                        <form action="" onSubmit={handleSubmit}>
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
                                    <option value="M">Masculin</option>
                                    <option value="F">Feminin</option>
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
            </div>
        </Modal>
    );
}

export default AjoutElecteur;