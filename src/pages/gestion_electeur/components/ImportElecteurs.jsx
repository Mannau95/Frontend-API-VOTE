import React, { useState } from "react";
import { FileUp, CheckCircle2, XCircle } from "lucide-react";
import Modal from "../../../Components/Modal.jsx";
import { useSelector } from "react-redux";
import { httpAxiosClient } from "../../../client/httpClient.js";
import CancelButton from "../../../Components/ui/CancelButton.jsx";
import SubmitButton from "../../../Components/ui/SubmitButton.jsx";
import DropZone from "../../../Components/input/DropZone.jsx";

function ImportElecteurs({ handleModalClose }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null); // { type: "success"|"error", message: string }
    const [submitting, setSubmitting] = useState(false);
    const { loading } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus({ type: "error", message: "Veuillez sélectionner un fichier." });
            return;
        }

        setSubmitting(true);
        setStatus(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            await httpAxiosClient.post("/users/import", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setStatus({ type: "success", message: "Fichier importé avec succès !" });
            setFile(null);
        } catch (error) {
            setStatus({
                type: "error",
                message: `Erreur lors de l'importation. ${error.message}`,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const isLoading = submitting || loading;

    return (
        <Modal handleModalClose={handleModalClose}>
            <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 w-full max-w-md p-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <FileUp className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">Importer des électeurs</h2>
                        <p className="text-xs text-gray-400">Fichier CSV ou Excel requis</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-5">

                        <DropZone
                            file={file}
                            onChange={setFile}
                            error={status?.type === "error" && !file ? status.message : ""}
                        />

                        {/* Status feedback */}
                        {status && (
                            <div className={`flex items-start gap-2 text-sm rounded-lg px-4 py-3 border
                ${status.type === "success"
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-red-50 border-red-200 text-red-600"
                            }`}
                            >
                                {status.type === "success"
                                    ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                    : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                }
                                <span>{status.message}</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-1">
                            <CancelButton handleModalClose={handleModalClose} />
                            <SubmitButton
                                isSubmitting={isLoading}
                                loadingText="Importation en cours..."
                                label="Importer"
                            />
                        </div>

                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ImportElecteurs;