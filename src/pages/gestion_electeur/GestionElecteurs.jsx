import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Pen, Trash } from "lucide-react";
import { httpAxiosClient } from "../../client/httpClient.js";
import { fetchElectors } from "../../store/userSlice.js";
import SearchBar from "../../Components/SearchBar.jsx";
import Button from "../../Components/ui/Button.jsx";
import CustomSelect from "../../Components/input/CustomSelect.jsx";
import CustomTable from "../../Components/table/CustomTable.jsx";
import TablePagination from "../../Components/table/TablePagination.jsx";
import Modal from "../../Components/Modal.jsx";
import AjoutElecteur from "./components/AjoutElecteur.jsx";
import ImportElecteurs from "./components/ImportElecteurs.jsx";

const ITEMS_PER_PAGE = 10;

export default function GestionElecteurs() {
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [feedback, setFeedback] = useState("");
    const statusList = [
        { label: "Actif", value: true },
        { label: "Inactif", value: false },
    ];

    const { electors } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [choice, setChoice] = useState("");

    const CHOICES = {
        ADD: "ADD",
        IMPORT: "IMPORT",
    };

    const rows = useMemo(() => electors, [electors]);
    const [page, setPage] = useState(1);
    const [paginatedRows, setPaginatedRows] = useState(rows.slice(0, ITEMS_PER_PAGE));

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            sex: "",
            birth_date: "",
            is_elector: true,
            is_supervisor: false,
            is_candidate: true,
        },
    });

    useEffect(() => {
        setPaginatedRows(rows.slice(0, ITEMS_PER_PAGE));
    }, [rows]);

    useEffect(() => {
        dispatch(fetchElectors())
            .unwrap()
            .then((data) => {
                setTotal(data.length || 0);
            })
            .catch(() => {
                setFeedback("Impossible de charger les électeurs.");
            });
    }, [dispatch]);

    const openEditModal = (user) => {
        setSelectedUser(user);
        reset({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            sex: user.sex || "",
            birth_date: user.birth_date ? user.birth_date.slice(0, 10) : "",
            is_elector: user.is_elector ?? true,
            is_supervisor: user.is_supervisor ?? false,
            is_candidate: user.is_candidate ?? true,
        });
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setFeedback("");
    };

    const handleDelete = async (pk) => {
        if (!window.confirm("Supprimer cet électeur ?")) {
            return;
        }

        try {
            await httpAxiosClient.delete(`/users/${pk}/`);
            await dispatch(fetchElectors()).unwrap();
            setFeedback("Électeur supprimé avec succès.");
        } catch (error) {
            setFeedback(error.message || "La suppression a échoué.");
        }
    };

    const handleEdit = async (data) => {
        if (!selectedUser) {
            return;
        }

        try {
            await httpAxiosClient.patch(`/users/${selectedUser.id}/`, data);
            await dispatch(fetchElectors()).unwrap();
            closeEditModal();
            setFeedback("Électeur mis à jour avec succès.");
        } catch (error) {
            setFeedback(error.message || "La mise à jour a échoué.");
        }
    };

    const columns = [
        { title: "Nom", code: "first_name" },
        { title: "Prénom", code: "last_name" },
        { title: "Email", code: "email" },
        { title: "Sexe", code: "sex" },
        {
            title: "Statut",
            code: "is_active",
            render: (row) => <span className="text-center">{row?.is_active ? "Actif" : "Inactif"}</span>,
        },
        {
            title: "Actions",
            code: "actions",
            render: (row) => (
                <div>
                    <button
                        onClick={() => openEditModal(row)}
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
            ),
        },
    ];

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Gestion des Électeurs</h1>

            <div className="bg-white h-full px-4 pb-6">
                <div className="py-2 flex justify-between items-center mt-5">
                    <div className="flex space-x-2">
                        <Button variant="primary" onClick={() => setChoice(CHOICES.ADD)}>
                            <CloudUpload size={15} />
                            Ajouter Electeur
                        </Button>

                        <Button variant="secondary" onClick={() => setChoice(CHOICES.IMPORT)}>
                            <CloudUpload size={15} />
                            Importer Electeurs
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <SearchBar placeholder="Rechercher un électeur" className="w-full" />
                        <CustomSelect
                            placeholder="Filtre par statut"
                            value={selectedStatus}
                            onChange={(value) => setSelectedStatus(value)}
                            options={statusList}
                        />
                    </div>
                </div>

                <p className="mb-4 text-gray-700 mt-4">
                    Nombre total d'électeurs : <strong>{total}</strong>
                </p>

                {feedback && (
                    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                        {feedback}
                    </div>
                )}

                <CustomTable rows={paginatedRows} columns={columns} />

                <TablePagination
                    rows={rows}
                    pageSize={ITEMS_PER_PAGE}
                    currentPage={page}
                    setPage={setPage}
                    setPaginatedRows={setPaginatedRows}
                />

                {choice === CHOICES.ADD && <AjoutElecteur handleModalClose={() => setChoice("")} />}

                {choice === CHOICES.IMPORT && <ImportElecteurs handleModalClose={() => setChoice("")} />}

                {selectedUser && (
                    <Modal handleModalClose={closeEditModal}>
                        <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">Modifier un électeur</h2>
                            <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-xs text-slate-500">Nom</label>
                                        <input
                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                            {...register("first_name", { required: "Le nom est requis" })}
                                        />
                                        {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-slate-500">Prénom</label>
                                        <input
                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                            {...register("last_name", { required: "Le prénom est requis" })}
                                        />
                                        {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs text-slate-500">Email</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                        {...register("email", { required: "L'email est requis" })}
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-xs text-slate-500">Sexe</label>
                                        <select
                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                            {...register("sex", { required: "Le sexe est requis" })}
                                        >
                                            <option value="">Sélectionner...</option>
                                            <option value="M">Masculin</option>
                                            <option value="F">Féminin</option>
                                        </select>
                                        {errors.sex && <p className="mt-1 text-xs text-red-500">{errors.sex.message}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-slate-500">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                            {...register("birth_date", { required: "La date est requise" })}
                                        />
                                        {errors.birth_date && <p className="mt-1 text-xs text-red-500">{errors.birth_date.message}</p>}
                                    </div>
                                </div>

                                <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                                    <p className="mb-2 text-xs font-medium text-slate-500">Rôles</p>
                                    <div className="flex flex-wrap gap-4">
                                        <label className="flex items-center gap-2 text-sm text-slate-700">
                                            <input type="checkbox" {...register("is_elector")} />
                                            Électeur
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-700">
                                            <input type="checkbox" {...register("is_supervisor")} />
                                            Superviseur
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-700">
                                            <input type="checkbox" {...register("is_candidate")} />
                                            Candidat
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                                    >
                                        {isSubmitting ? "Enregistrement…" : "Enregistrer"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
}
