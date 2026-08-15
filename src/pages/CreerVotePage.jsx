import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createElection } from "../store/electionSlice.js";
import Modal from "../Components/Modal.jsx";
import QuotaBanner from "../Components/QuotaBanner.jsx";
import { isQuotaAtLimit } from "../utils/quota.js";
import useSubscriptionUsage from "../hooks/useSubscriptionUsage.js";

const defaultValues = {
    name: "",
    description: "",
    begin_date: "",
    end_date: "",
};

function FieldError({ message }) {
    if (!message) return null;
    return (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {message}
        </p>
    );
}

function inputClass(hasError) {
    return `w-full text-sm px-3 py-2 rounded-lg border transition-colors
    focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400
    ${hasError
        ? "border-red-300 bg-red-50"
        : "border-gray-200 bg-white hover:border-gray-300"
    }`;
}

export default function CreerVotePage({handleModalClose}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.elections);
    const { usage } = useSubscriptionUsage();
    const electionsAtLimit = isQuotaAtLimit(usage, "elections_used", "elections_limit");

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        if (electionsAtLimit) return;
        try {
            const response = await dispatch(createElection(data)).unwrap();
            if (response) {
                reset()
                handleModalClose();
                // navigate("/supervision/elections/");
            }
        } catch (err) {
            console.error("Erreur lors de la création de l'élection.", err);
        }
    };

    return (
        <Modal handleModalClose={() => {
            handleModalClose()
            reset()
        }}>
            <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 w-full max-w-2xl p-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">Nouvelle élection</h2>
                        <p className="text-xs text-gray-400">Remplissez tous les champs requis</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-5">

                        {/* Titre */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                Titre de l'élection <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="ex: Élection du président de bureau"
                                className={inputClass(errors.name)}
                                {...register("name", {
                                    required: "Le titre est requis",
                                    minLength: { value: 3, message: "Au moins 3 caractères" },
                                })}
                            />
                            <FieldError message={errors.name?.message} />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Date de début <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    className={inputClass(errors.begin_date)}
                                    {...register("begin_date", {
                                        required: "La date de début est requise",
                                        validate: (v) =>
                                            new Date(v) > new Date() || "La date doit être dans le futur",
                                    })}
                                />
                                <FieldError message={errors.begin_date?.message} />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Date de fin <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    className={inputClass(errors.end_date)}
                                    {...register("end_date", {
                                        required: "La date de fin est requise",
                                        validate: (v, values) =>
                                            !values.begin_date ||
                                            new Date(v) > new Date(values.begin_date) ||
                                            "La fin doit être après le début",
                                    })}
                                />
                                <FieldError message={errors.end_date?.message} />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Décrivez l'objet de cette élection, les candidats, les enjeux..."
                                className={inputClass(errors.description)}
                                {...register("description", {
                                    required: "La description est requise",
                                    minLength: { value: 10, message: "Au moins 10 caractères" },
                                })}
                            />
                            <FieldError message={errors.description?.message} />
                        </div>

                        {/* Garde-fou de quota, proactif (avant soumission) */}
                        <QuotaBanner
                            used={usage?.elections_used}
                            limit={usage?.elections_limit}
                            resourceLabel="élections"
                        />

                        {/* API / Redux error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2 text-sm text-red-600">
                                <span className="mt-0.5">⚠</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-1 justify-end">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600
                  hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting || electionsAtLimit}
                                title={electionsAtLimit ? "Limite du plan atteinte" : undefined}
                                className="px-5 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white
                  font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Création en cours...
                                    </>
                                ) : (
                                    "Créer l'élection"
                                )}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </Modal>
    );
}
