import React from 'react';
import Modal from "../../../Components/Modal.jsx";
import { useForm, Controller } from "react-hook-form";
import { httpAxiosClient } from "../../../client/httpClient.js";
import CheckBox from "../../../Components/ui/CheckBox.jsx";
import CancelButton from "../../../Components/ui/CancelButton.jsx";
import SubmitButton from "../../../Components/ui/SubmitButton.jsx";

const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    sex: "",
    birth_date: "",
    is_elector: true,
    is_supervisor: false,
    is_candidate: true,
};

function FieldError({ message }) {
    if (!message) return null;
    return (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {message}
        </p>
    );
}

function AjoutElecteur({ handleModalClose }) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues });
    const ROLE_OPTIONS = [
        { name: "is_elector", label: "Électeur" },
        { name: "is_supervisor", label: "Superviseur" },
        { name: "is_candidate", label: "Candidat" },
    ];

    const onSubmit = async (data) => {
        try {
            await httpAxiosClient.post("/users/", data);
            reset(defaultValues);
            handleModalClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'électeur.", error);
        }
    };

    return (
        <Modal handleModalClose={handleModalClose}>
            <div className="bg-white text-gray-900 rounded-xl shadow-lg w-full max-w-xl p-14 ">

                {/* En-tête */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-medium text-gray-900">Ajouter un électeur</h2>
                        <p className="text-xs text-gray-400">Remplissez tous les champs requis</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-4">

                        {/* Nom / Prénom */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Nom <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex: Dupont"
                                    className={`w-full text-sm px-3 py-2 rounded-lg border transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                    ${errors.first_name
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                                    {...register("first_name", {
                                        required: "Le nom est requis",
                                        minLength: { value: 2, message: "Au moins 2 caractères" },
                                    })}
                                />
                                <FieldError message={errors.first_name?.message} />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Prénom <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex: Jean"
                                    className={`w-full text-sm px-3 py-2 rounded-lg border transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                    ${errors.last_name
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                                    {...register("last_name", {
                                        required: "Le prénom est requis",
                                        minLength: { value: 2, message: "Au moins 2 caractères" },
                                    })}
                                />
                                <FieldError message={errors.last_name?.message} />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="jean.dupont@example.com"
                                className={`w-full text-sm px-3 py-2 rounded-lg border transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                  ${errors.email
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                                {...register("email", {
                                    required: "L'email est requis",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Format d'email invalide",
                                    },
                                })}
                            />
                            <FieldError message={errors.email?.message} />
                        </div>

                        {/* Sexe / Date */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Sexe <span className="text-red-400">*</span>
                                </label>
                                <select
                                    className={`w-full text-sm px-3 py-2 rounded-lg border transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                    ${errors.sex
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                                    {...register("sex", { required: "Champ requis" })}
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                                <FieldError message={errors.sex?.message} />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Date de naissance <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="date"
                                    className={`w-full text-sm px-3 py-2 rounded-lg border transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                    ${errors.birth_date
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                                    {...register("birth_date", {
                                        required: "La date est requise",
                                        validate: (v) =>
                                            new Date(v) < new Date() || "Date invalide",
                                    })}
                                />
                                <FieldError message={errors.birth_date?.message} />
                            </div>
                        </div>

                        {/* Rôles */}
                        <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                            <p className="text-xs font-medium text-gray-500 mb-2">Rôles</p>
                            <div className="flex items-center gap-5 pl-4">
                                {ROLE_OPTIONS.map(({ name, label }) => (
                                    <label
                                        key={name}
                                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                                    >
                                        <Controller
                                            name={name}
                                            control={control}
                                            render={({ field }) => (
                                                <CheckBox
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                />
                                            )}
                                        />
                                        <span className="ml-2">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="flex gap-3 pt-1">
                            <CancelButton handleModalClose={handleModalClose} />
                            <SubmitButton isSubmitting={isSubmitting} loadingText="Ajout en cours..." label="Ajouter l'électeur"/>
                        </div>

                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AjoutElecteur;