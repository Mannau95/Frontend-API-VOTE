// CandidatureFormPage.jsx
import { useForm } from "react-hook-form";
import {FormSection, Textarea, TextInput} from "../../Components/ui/Form.jsx";

export default function CandidatureFormPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Candidature soumise :", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* En-tête */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Formulaire de Candidature</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Veuillez remplir le formulaire ci-dessous pour soumettre votre candidature au poste.
                        Tous les champs sont obligatoires.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {/* Informations personnelles */}
                    <FormSection title="" subtitle="">
                        <TextInput
                            label="Nom"
                            placeholder="Votre nom"
                            hint="Votre nom de famille complet, tel qu'il apparaît sur vos documents officiels."
                            error={errors.nom?.message}
                            registration={register("nom", { required: "Le nom est requis." })}
                        />
                        <TextInput
                            label="Prénom"
                            placeholder="Votre prénom"
                            hint="Votre prénom, tel qu'il apparaît sur vos documents officiels."
                            error={errors.prenom?.message}
                            registration={register("prenom", { required: "Le prénom est requis." })}
                        />
                        <TextInput
                            label="Adresse E-mail"
                            placeholder="exemple@domaine.com"
                            hint="L'adresse e-mail principale que nous utiliserons pour vous contacter."
                            error={errors.email?.message}
                            registration={register("email", {
                                required: "L'adresse e-mail est requise.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Adresse e-mail invalide.",
                                },
                            })}
                        />
                        <TextInput
                            label="Numéro de Téléphone"
                            placeholder="+33 6 00 00 00 00"
                            hint="Votre numéro de téléphone, y compris l'indicatif du pays, pour toute communication urgente."
                            error={errors.telephone?.message}
                            registration={register("telephone", { required: "Le numéro de téléphone est requis." })}
                        />
                    </FormSection>

                    {/* Biographie & Motivation */}
                    <FormSection title="" subtitle="">
                        <Textarea
                            label="Courte biographie"
                            placeholder="Par exemple: Expert en gestion de projet avec 10 ans d'expérience..."
                            hint="Décrivez-vous en quelques phrases, en mettant en avant votre expérience et vos qualifications pertinentes."
                            error={errors.biographie?.message}
                            registration={register("biographie", { required: "La biographie est requise." })}
                            rows={4}
                        />
                        <Textarea
                            label="Lettre de motivation"
                            placeholder="Veuillez détailler vos motivations ici..."
                            hint="Expliquez pourquoi vous êtes le candidat idéal pour ce poste et ce qui vous motive à participer."
                            error={errors.motivation?.message}
                            registration={register("motivation", { required: "La lettre de motivation est requise." })}
                            rows={4}
                        />
                    </FormSection>

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
                            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                        >
                            Soumettre ma candidature
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}