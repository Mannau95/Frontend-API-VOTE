// ModifyElectionPage.jsx
import { useForm } from "react-hook-form";
import {CheckboxInput, DateInput, FormSection, SelectInput, Textarea, TextInput} from "../../Components/ui/Form.jsx";

const STATUT_OPTIONS = [
    { value: "active",    label: "Active" },
    { value: "brouillon", label: "Brouillon" },
    { value: "terminee",  label: "Terminée" },
    { value: "annulee",   label: "Annulée" },
];

const DEFAULT_VALUES = {
    nom:         "Élection du Conseil d'Administration 2024",
    description: "Vote pour l'élection des membres du Conseil d'Administration pour l'exercice fiscal 2024. Les candidats sont invités à présenter leurs programmes et visions pour l'avenir de l'entreprise.",
    dateDebut:   "2024-06-01",
    dateFin:     "2024-06-15",
    dateVote:    "2024-06-05",
    statut:      "active",
    visible:     true,
};

export default function ModifyElectionPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: DEFAULT_VALUES });

    const onSubmit = (data) => {
        console.log("Modifications enregistrées :", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-bold text-gray-900">Modification de l'Élection</h1>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5"
            >
                {/* Informations Générales */}
                <FormSection
                    title="Informations Générales"
                    subtitle="Mettez à jour le nom et la description de l'élection."
                >
                    <TextInput
                        label="Nom de l'élection"
                        hint="Le nom officiel de l'élection."
                        error={errors.nom?.message}
                        registration={register("nom", { required: "Le nom est requis." })}
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

                {/* Dates Importantes */}
                <FormSection
                    title="Dates Importantes"
                    subtitle="Définissez les dates clés pour le déroulement de l'élection."
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <DateInput
                            label="Date de début de l'élection"
                            hint="La date à laquelle l'élection commence officiellement."
                            error={errors.dateDebut?.message}
                            registration={register("dateDebut", { required: "Requis." })}
                        />
                        <DateInput
                            label="Date de fin de l'élection"
                            hint="La date à laquelle la phase de vote se termine."
                            error={errors.dateFin?.message}
                            registration={register("dateFin", { required: "Requis." })}
                        />
                        <DateInput
                            label="Début du vote"
                            hint="Le moment où les participants peuvent commencer à voter."
                            error={errors.dateVote?.message}
                            registration={register("dateVote", { required: "Requis." })}
                        />
                    </div>
                </FormSection>

                {/* Statut de l'Élection */}
                <FormSection
                    title="Statut de l'Élection"
                    subtitle="Gérez le statut actuel et la visibilité de l'élection."
                >
                    <SelectInput
                        label="Statut"
                        hint="Le statut actuel de l'élection (ex: Active, Brouillon, Terminée)."
                        error={errors.statut?.message}
                        registration={register("statut")}
                        options={STATUT_OPTIONS}
                    />
                    <CheckboxInput
                        label="Rendre l'élection visible publiquement"
                        hint="Cochez si l'élection doit être visible par tous les participants."
                        error={errors.visible?.message}
                        registration={register("visible")}
                    />
                </FormSection>

                {/* Actions */}
                <div className="flex justify-end items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
}