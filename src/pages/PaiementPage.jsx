import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card.jsx";
import Button from "../Components/ui/Button.jsx";
import { CreditCard, Smartphone, CheckCircle2 } from "lucide-react";

const PLAN_DETAILS = {
    starter: { name: "Starter", price: "0 €", description: "Essentiel pour un premier lancement." },
    pro: { name: "Pro", price: "29 €", description: "Pour des campagnes régulières et plus d’évolutions." },
    entreprise: { name: "Entreprise", price: "99 €", description: "Pour les organisations à grande échelle." },
};

export default function PaiementPage() {
    const navigate = useNavigate();
    const [method, setMethod] = useState("stripe");
    const [confirmed, setConfirmed] = useState(false);

    const selectedPlan = useMemo(() => localStorage.getItem("selectedPlan") || "starter", []);
    const plan = PLAN_DETAILS[selectedPlan] || PLAN_DETAILS.starter;

    const handleConfirm = () => {
        setConfirmed(true);
        setTimeout(() => navigate("/organisation"), 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Paiement</p>
                    <h1 className="text-3xl font-bold text-slate-900 mt-2">Finalisez votre abonnement</h1>
                    <p className="text-slate-600 mt-3">
                        Choisissez votre méthode de paiement. Cette étape est purement frontale pour l’instant, prête à être branchée à un vrai fournisseur.
                    </p>

                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] mt-8">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Résumé du plan</h2>
                            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-900">{plan.name}</p>
                                        <p className="text-sm text-slate-500">{plan.description}</p>
                                    </div>
                                    <div className="text-xl font-bold text-slate-900">{plan.price}</div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => setMethod("stripe")}
                                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${method === "stripe" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                                >
                                    <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <CreditCard className="w-4 h-4" /> Carte bancaire / Stripe
                                    </span>
                                    <span className="text-sm text-slate-500">Recommandé</span>
                                </button>
                                <button
                                    onClick={() => setMethod("mobile")}
                                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${method === "mobile" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                                >
                                    <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <Smartphone className="w-4 h-4" /> Mobile money
                                    </span>
                                    <span className="text-sm text-slate-500">MonCash / Orange</span>
                                </button>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Validation</h2>
                            <p className="text-sm text-slate-600 mt-2">
                                Une fois la méthode choisie, la confirmation met à jour l’état d’onboarding et redirige vers votre espace organisation.
                            </p>

                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                <div className="flex items-center gap-2 font-semibold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Méthode sélectionnée : {method === "stripe" ? "Stripe" : "Mobile money"}
                                </div>
                            </div>

                            <Button variant="primary" className="w-full mt-6" onClick={handleConfirm} disabled={confirmed}>
                                {confirmed ? "Confirmation…" : "Confirmer l’abonnement"}
                            </Button>
                            <Button variant="secondary" className="w-full mt-3" onClick={() => navigate("/abonnement")}>
                                Revenir au choix du plan
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
