// CandidatureDetailPage.jsx
import { Pencil, Trash2 } from "lucide-react";
import {CandidatInfoCard, DocumentsCard, MotivationCard} from "./CandidatureInfo.jsx";
import {PosteCard, StatutCard} from "./CandidatureSidebar.jsx";

// ── Données de démonstration ──────────────────────────────────────────────────
const CANDIDAT = {
    name:      "Émilie Dubois",
    email:     "emilie.dubois@email.com",
    phone:     "+33 6 12 34 56 78",
    linkedin:  "linkedin.com/in/emiliedubois",
    portfolio: "emiliedubois.dev",
    cv:        "EmilieDubois.pdf",
};

const STATUT = {
    label:           "Interview planifiée",
    dateSubmission:  "23/07/2024",
    dateMaj:         "01/08/2024",
    notes:
        "Entretien téléphonique réalisé le 30/07. Profil très intéressant, bonne adéquation avec les compétences techniques requises et excellente communication. Planifier un second entretien avec le Lead Tech.",
};

const POSTE = {
    titre:        "Développeur Full-Stack Senior",
    departement:  "Développement Logiciel",
    contrat:      "CDI",
    programme:    "Développement Web Avancé",
    localisation: "Paris, France",
};

const MOTIVATION = `Madame, Monsieur, Je vous écris pour exprimer mon vif intérêt pour le poste de Développeur Full-Stack Senior, tel que publié sur votre site carrière. Forte de 7 ans d'expérience dans le développement web, avec une expertise particulière en React, Node.js et les bases de données SQL/NoSQL, je suis convaincue de pouvoir apporter une contribution significative à votre équipe. Au cours de mes expériences précédentes, notamment chez TechInnov, j'ai eu l'opportunité de concevoir et de déployer des applications web complexes, d'optimiser les performances backend et de collaborer étroitement avec les équipes produit et UX/UI pour livrer des solutions innovantes et conviviales. Mon approche est centrée sur la qualité du code, les bonnes pratiques de développement et une veille technologique constante. Je suis particulièrement attirée par la culture d'innovation de votre entreprise et les défis techniques que propose ce rôle. Je suis impatiente de mettre à profit mes compétences pour développer des solutions performantes et évolutives au sein de votre environnement dynamique. Vous trouverez ci-joint mon CV détaillant mon parcours et mes réalisations. Je serais ravie de discuter plus en détail de ma candidature lors d'un entretien. Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées. Émilie Dubois`;

const DOCUMENTS = [
    "Diplôme_Master_Informatique.pdf",
    "Certificat_AWS_Developer.pdf",
    "Lettre_Recommandation_Ancien_Manager.pdf",
];
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidatureDetailPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-0.5">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Candidatures</a>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">Détails de la Candidature</h1>
                    <p className="text-sm text-gray-500">
                        {CANDIDAT.name} — {POSTE.titre}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Pencil size={14} />
                        Modifier candidature
                    </button>
                    <button className="inline-flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Trash2 size={14} />
                        Supprimer candidature
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Colonne principale */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <CandidatInfoCard candidat={CANDIDAT} />
                    <MotivationCard text={MOTIVATION} />
                    <DocumentsCard documents={DOCUMENTS} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                    <StatutCard
                        statut={STATUT.label}
                        dateSubmission={STATUT.dateSubmission}
                        dateMaj={STATUT.dateMaj}
                        notes={STATUT.notes}
                    />
                    <PosteCard poste={POSTE} />
                </div>

            </div>
        </div>
    );
}