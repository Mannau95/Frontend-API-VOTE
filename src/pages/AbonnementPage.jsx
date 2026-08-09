import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card.jsx";
import Button from "../Components/ui/Button.jsx";
import { CheckCircle2, Sparkles, Rocket, Building2 } from "lucide-react";

const PLAN_DETAILS = {
    starter: {
        name: "Starter",
        price: "0 € / mois",
        description: "Parfait pour tester une première élection avec un périmètre réduit.",
        icon: Sparkles,
        limits: ["1 organisation", "3 élections actives", "100 électeurs", "Validation manuelle des candidatures"],
    },
    pro: {
        name: "Pro",
        price: "29 € / mois",
        description: "Pour les équipes qui organisent plusieurs votes par mois.",
        icon: Rocket,
        limits: ["5 organisations", "20 élections actives", "5 000 électeurs", "Rapports détaillés"],
    },
    entreprise: {
        name: "Entreprise",
        price: "99 € / mois",
        description: "Pour les gros programmes de vote avec sécurité et support dédié.",
        icon: Building2,
        limits: ["Organisations illimitées", "Élections illimitées", "Électeurs illimitées", "Support prioritaire"],
    },
};

export default function AbonnementPage() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(() => localStorage.getItem("selectedPlan") || "starter");

    const handleSelectPlan = (planKey) => {
        localStorage.setItem("selectedPlan", planKey);
        setSelectedPlan(planKey);
        navigate("/paiement");
    };

    const currentPlan = useMemo(() => PLAN_DETAILS[selectedPlan] || PLAN_DETAILS.starter, [selectedPlan]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Abonnement</p>
                    <h1 className="text-3xl font-bold text-slate-900 mt-2">Choisissez votre plan</h1>
                    <p className="text-slate-600 mt-3">
                        Configurez rapidement votre espace d’organisation et préparez votre première élection.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {Object.entries(PLAN_DETAILS).map(([key, plan]) => {
                        const Icon = plan.icon;
                        const isSelected = selectedPlan === key;

                        return (
                            <Card key={key} className="p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`rounded-full p-2 ${isSelected ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
                                        <p className="text-sm text-slate-500">{plan.description}</p>
                                    </div>
                                </div>

                                <div className="text-3xl font-bold text-slate-900 mb-5">{plan.price}</div>
                                <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                                    {plan.limits.map((limit) => (
                                        <li key={limit} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                            <span>{limit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={isSelected ? "primary" : "secondary"}
                                    className="w-full"
                                    onClick={() => handleSelectPlan(key)}
                                >
                                    {isSelected ? "Plan sélectionné" : "Choisir ce plan"}
                                </Button>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-4 text-sm text-slate-700">
                    Plan actuel : <span className="font-semibold text-slate-900">{currentPlan.name}</span>
                </div>
            </div>
        </div>
    );
}
