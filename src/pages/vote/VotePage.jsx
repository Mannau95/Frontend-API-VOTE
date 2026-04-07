// VotePage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";

// ── Données ───────────────────────────────────────────────────────────────────
const ELECTION = {
    titre: "Élection des Délégués du Personnel 2024",
    description:
        "Votez pour élire les représentants du personnel qui défendront vos intérêts au sein de l'entreprise. Votre participation est essentielle pour garantir une représentation équitable.",
    instructions:
        "Veuillez lire attentivement les programmes des candidats avant de faire votre choix. Sélectionnez un seul candidat en cliquant sur le bouton radio correspondant. Vous pourrez confirmer votre vote avant la soumission finale. Une fois confirmé, votre vote sera définitif et ne pourra pas être modifié.",
};

const CANDIDATS = [
    {
        id: "emilie",
        nom: "Émilie Dubois",
        role: "Délégué Principal",
        avatar: "https://i.pravatar.cc/150?img=47",
        programme:
            "Je m'engage à défendre les conditions de travail, améliorer le dialogue social et représenter chaque employé avec transparence et équité.",
    },
    {
        id: "marc",
        nom: "Marc Laurent",
        role: "Délégué Suppléant",
        avatar: "https://i.pravatar.cc/150?img=12",
        programme:
            "Mon objectif est de renforcer la communication entre la direction et les équipes, et d'œuvrer pour un environnement de travail sain et inclusif.",
    },
    {
        id: "sophie",
        nom: "Sophie Lefevre",
        role: "Délégué Principal",
        avatar: "https://i.pravatar.cc/150?img=32",
        programme:
            "Forte de 8 ans d'expérience syndicale, je porterai vos préoccupations avec détermination et ferai valoir vos droits auprès de la direction.",
    },
    {
        id: "thomas",
        nom: "Thomas Bernard",
        role: "Délégué Suppléant",
        avatar: "https://i.pravatar.cc/150?img=57",
        programme:
            "Engagé pour la justice sociale et l'égalité au travail, je travaillerai à améliorer les conditions pour tous les collaborateurs.",
    },
];
// ─────────────────────────────────────────────────────────────────────────────

function CandidatCard({ candidat, selected, onSelect }) {
    const [open, setOpen] = useState(false);

    return (
        <Card
            className={`p-5 flex flex-col items-center gap-3 cursor-pointer transition-all ${
                selected
                    ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/40"
                    : "hover:border-gray-300"
            }`}
            onClick={onSelect}
        >
            {/* Avatar */}
            <img
                src={candidat.avatar}
                alt={candidat.nom}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
            />

            {/* Nom & rôle */}
            <div className="text-center">
                <p className={`text-sm font-semibold ${selected ? "text-indigo-700" : "text-gray-900"}`}>
                    {candidat.nom}
                </p>
                <p className="text-xs text-gray-400">{candidat.role}</p>
            </div>

            {/* Programme toggle */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
            >
                Programme du candidat
                {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {open && (
                <p className="text-xs text-gray-600 text-center leading-relaxed border-t border-gray-100 pt-3 w-full">
                    {candidat.programme}
                </p>
            )}

            {/* Radio */}
            <label
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-1"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="radio"
                    name="candidat"
                    value={candidat.id}
                    checked={selected}
                    onChange={onSelect}
                    className="accent-indigo-600 w-4 h-4"
                />
                Sélectionner
            </label>
        </Card>
    );
}

export default function VotePage() {
    const { handleSubmit, formState: { errors } } = useForm();
    const [selected, setSelected] = useState(null);

    const onSubmit = () => {
        if (!selected) return;
        console.log("Vote soumis pour :", selected);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">

                {/* Titre */}
                <h1 className="text-2xl font-bold text-gray-900">
                    Voter pour : {ELECTION.titre}
                </h1>

                {/* Détails élection */}
                <Card className="p-5 flex flex-col gap-3">
                    <h2 className="text-sm font-semibold text-gray-800">Détails de l'Élection</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{ELECTION.description}</p>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">Instructions de Vote :</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{ELECTION.instructions}</p>
                    </div>
                </Card>

                {/* Candidats */}
                <div>
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Candidats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CANDIDATS.map((c) => (
                            <CandidatCard
                                key={c.id}
                                candidat={c}
                                selected={selected === c.id}
                                onSelect={() => setSelected(c.id)}
                            />
                        ))}
                    </div>
                    {!selected && errors.candidat && (
                        <p className="text-xs text-red-500 mt-2">Veuillez sélectionner un candidat.</p>
                    )}
                </div>

                {/* Bouton soumettre */}
                <div className="flex justify-center pb-4">
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={!selected}
                        className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            selected
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-indigo-200 text-indigo-400 cursor-not-allowed"
                        }`}
                    >
                        Soumettre mon vote
                    </button>
                </div>

            </div>
        </div>
    );
}