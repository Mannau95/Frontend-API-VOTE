// ModifyElectionPage.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CheckboxInput, DateInput, FormSection, Textarea, TextInput } from "../../Components/ui/Form.jsx";
import { fetchElections, updateElection } from "../../store/electionSlice.js";

function formatDateTimeForInput(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localTime.toISOString().slice(0, 16);
}

export default function ModifyElectionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { elections, loading, error } = useSelector((state) => state.elections);

    const election = elections.find((item) => String(item.id) === String(id));

    const defaultValues = useMemo(() => ({
        name: election?.name ?? "",
        description: election?.description ?? "",
        begin_date: formatDateTimeForInput(election?.begin_date),
        end_date: formatDateTimeForInput(election?.end_date),
        is_active: election?.is_active ?? true,
    }), [election]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues });

    useEffect(() => {
        if (!elections.length) {
            dispatch(fetchElections());
        }
    }, [dispatch, elections.length]);

    useEffect(() => {
        if (election) {
            reset(defaultValues);
        }
    }, [defaultValues, election, reset]);

    const onSubmit = async (data) => {
        try {
            await dispatch(updateElection({
                electionId: id,
                electionData: {
                    ...data,
                    begin_date: data.begin_date,
                    end_date: data.end_date,
                },
            })).unwrap();
            navigate("/supervision/elections/");
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'élection.", err);
        }
    };

    if (!election && !loading) {
        return (
            <div className="min-h-screen bg-gray-50 px-6 py-10 text-sm text-slate-600">
                Élection introuvable.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-bold text-gray-900">Modification de l'Élection</h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5"
            >
                <FormSection
                    title="Informations Générales"
                    subtitle="Mettez à jour le nom et la description de l'élection."
                >
                    <TextInput
                        label="Nom de l'élection"
                        hint="Le nom officiel de l'élection."
                        error={errors.name?.message}
                        registration={register("name", { required: "Le nom est requis." })}
                        placeholder="Ex : Élection du Conseil 2025"
                    />
                    <Textarea
                        label="Description"
                        hint="Une description détaillée de l'objet et des enjeux de cette élection."
                        error={errors.description?.message}
                        registration={register("description", { required: "La description est requise." })}
                        rows={5}
                    />
                </FormSection>

                <FormSection
                    title="Dates Importantes"
                    subtitle="Définissez les dates clés pour le déroulement de l'élection."
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DateInput
                            label="Date de début"
                            hint="La date à laquelle l'élection commence officiellement."
                            error={errors.begin_date?.message}
                            registration={register("begin_date", { required: "Requis." })}
                            type="datetime-local"
                        />
                        <DateInput
                            label="Date de fin"
                            hint="La date à laquelle la phase de vote se termine."
                            error={errors.end_date?.message}
                            registration={register("end_date", { required: "Requis." })}
                            type="datetime-local"
                        />
                    </div>
                </FormSection>

                <FormSection
                    title="Statut de l'Élection"
                    subtitle="Activez ou désactivez l'élection."
                >
                    <CheckboxInput
                        label="Élection active"
                        hint="Cochez pour rendre l'élection active."
                        error={errors.is_active?.message}
                        registration={register("is_active")}
                    />
                </FormSection>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="flex justify-end items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
                    <button
                        type="button"
                        onClick={() => navigate("/supervision/elections/")}
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-60"
                    >
                        {isSubmitting ? "Enregistrement…" : "Enregistrer les modifications"}
                    </button>
                </div>
            </form>
        </div>
    );
}