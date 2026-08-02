// CandidatureFormPage.jsx
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MarkdownField } from "../../Components/ui/MarkdownField.jsx";
import { createCandidature } from "../../store/candidatureSlice.js";
import Modal from "../../Components/Modal.jsx";

export default function CandidatureFormPage({ electionId, handleModalClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.candidatures);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { biographie: "", motivation: "" },
    });

    const onSubmit = async (data) => {
        const motivation = data.motivation?.trim();
        const description = motivation
            ? `## Biographie\n\n${data.biographie}\n\n## Motivation\n\n${motivation}`
            : `## Biographie\n\n${data.biographie}`;
        try {
            await dispatch(
                createCandidature({ election: electionId, description })
            ).unwrap();
            reset();
            handleModalClose();
            navigate("/electeur/candidatures/");
        } catch (err) {
            console.error("Erreur lors de la soumission de la candidature.", err);
        }
    };

    return (
        <Modal handleModalClose={() => {
            handleModalClose();
            reset();
        }}>
            <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 w-full max-w-3xl p-10 max-h-[90vh] overflow-y-auto">
                {/* En-tête */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Formulaire de Candidature</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Veuillez remplir le formulaire ci-dessous pour soumettre votre candidature au poste.
                        La biographie est obligatoire, la lettre de motivation est optionnelle.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {/* Informations personnelles */}
                    {/*<FormSection title="" subtitle="">*/}
                    {/*    <TextInput*/}
                    {/*        label="Nom"*/}
                    {/*        placeholder="Votre nom"*/}
                    {/*        hint="Votre nom de famille complet, tel qu'il apparaît sur vos documents officiels."*/}
                    {/*        error={errors.nom?.message}*/}
                    {/*        registration={register("nom", { required: "Le nom est requis." })}*/}
                    {/*    />*/}
                    {/*    <TextInput*/}
                    {/*        label="Prénom"*/}
                    {/*        placeholder="Votre prénom"*/}
                    {/*        hint="Votre prénom, tel qu'il apparaît sur vos documents officiels."*/}
                    {/*        error={errors.prenom?.message}*/}
                    {/*        registration={register("prenom", { required: "Le prénom est requis." })}*/}
                    {/*    />*/}
                    {/*    <TextInput*/}
                    {/*        label="Adresse E-mail"*/}
                    {/*        placeholder="exemple@domaine.com"*/}
                    {/*        hint="L'adresse e-mail principale que nous utiliserons pour vous contacter."*/}
                    {/*        error={errors.email?.message}*/}
                    {/*        registration={register("email", {*/}
                    {/*            required: "L'adresse e-mail est requise.",*/}
                    {/*            pattern: {*/}
                    {/*                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,*/}
                    {/*                message: "Adresse e-mail invalide.",*/}
                    {/*            },*/}
                    {/*        })}*/}
                    {/*    />*/}
                    {/*    <TextInput*/}
                    {/*        label="Numéro de Téléphone"*/}
                    {/*        placeholder="+229 01 00 00 00 00"*/}
                    {/*        hint="Votre numéro de téléphone, y compris l'indicatif du pays, pour toute communication urgente."*/}
                    {/*        error={errors.telephone?.message}*/}
                    {/*        registration={register("telephone", { required: "Le numéro de téléphone est requis." })}*/}
                    {/*    />*/}
                    {/*</FormSection>*/}

                    {/* Biographie & Motivation */}
                    <Controller
                        name="biographie"
                        control={control}
                        rules={{ required: "La biographie est requise." }}
                        render={({ field }) => (
                            <MarkdownField
                                label="Courte biographie"
                                hint="Décrivez-vous en quelques phrases, en mettant en avant votre expérience et vos qualifications pertinentes. Le format Markdown est pris en charge."
                                error={errors.biographie?.message}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Par exemple: Expert en gestion de projet avec 10 ans d'expérience..."
                            />
                        )}
                    />

                    <Controller
                        name="motivation"
                        control={control}
                        render={({ field }) => (
                            <MarkdownField
                                label="Lettre de motivation (optionnel)"
                                hint="Expliquez pourquoi vous êtes le candidat idéal pour ce poste et ce qui vous motive à participer. Le format Markdown est pris en charge."
                                error={errors.motivation?.message}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Veuillez détailler vos motivations ici..."
                            />
                        )}
                    />

                    {/* Erreur API / Redux */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2 text-sm text-red-600">
                            <span className="mt-0.5">⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-3">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Réinitialiser
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting || loading ? "Envoi en cours..." : "Soumettre ma candidature"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
