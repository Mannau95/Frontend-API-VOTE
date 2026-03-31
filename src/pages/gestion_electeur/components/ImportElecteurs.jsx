import React, {useState} from 'react';
import Modal from "../../../Components/Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {httpAxiosClient} from "../../../client/httpClient.js";

function ImportElecteurs({handleModalClose}) {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const { loading, error } = useSelector(state => state.user);

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

        try {
            await httpAxiosClient.post("/users/import", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Fichier importé avec succès !");
        } catch (error) {
            setMessage(`Erreur lors de l'importation., ${error.message}`);
        }
    };
    return (
        <Modal handleModalClose = {handleModalClose}>
            {/* Import CSV */}

            <div className="flex justify-center items-center mb-10 bg-white text-black">
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
        </Modal>
    );
}

export default ImportElecteurs;