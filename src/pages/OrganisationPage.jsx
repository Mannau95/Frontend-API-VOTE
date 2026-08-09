import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card.jsx";
import Button from "../Components/ui/Button.jsx";
import { Building2, ArrowRight, Crown, CreditCard, RefreshCw, XCircle } from "lucide-react";

const PLAN_DETAILS = {
    starter: {
        name: "Starter",
        limitLabel: "3 élections actives",
        membersLabel: "100 électeurs max",
    },
    pro: {
        name: "Pro",
        limitLabel: "20 élections actives",
        membersLabel: "5 000 électeurs max",
    },
    entreprise: {
        name: "Entreprise",
        limitLabel: "Élections illimitées",
        membersLabel: "Électeurs illimités",
    },
};

export default function OrganisationPage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const selectedPlan = useMemo(() => localStorage.getItem("selectedPlan") || "starter", []);
    const plan = PLAN_DETAILS[selectedPlan] || PLAN_DETAILS.starter;
    const [isCancelled, setIsCancelled] = useState(false);

    const handleCancel = () => {
        setIsCancelled(true);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Mon organisation</p>
                        <h1 className="text-3xl font-bold text-slate-900 mt-2">
                            {user?.organisation_name || "Votre organisation"}
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Gérez votre plan, les limites d’usage et les prochaines étapes d’onboarding.
                        </p>
                    </div>
                    <Button variant="secondary" onClick={() => navigate("/abonnement")}>Modifier le plan</Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="rounded-full bg-indigo-600 p-2 text-white">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Plan actuel</h2>
                                    <p className="text-sm text-slate-500">Votre organisation est prête à évoluer.</p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                                    <Crown className="w-4 h-4" />
                                    {plan.name}
                                </div>
                                <div className="mt-3 text-sm text-slate-600 space-y-2">
                                    <p>Limites d’usage : {plan.limitLabel}</p>
                                    <p>Audience : {plan.membersLabel}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Gestion de l’abonnement</h2>
                                    <p className="text-sm text-slate-500">Changement de plan, facturation et annulation.</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex items-center justify-between">
                                        <span>État de facturation</span>
                                        <span className="font-semibold text-emerald-600">À jour</span>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex items-center justify-between">
                                        <span>Prochain renouvellement</span>
                                        <span className="font-semibold text-slate-900">Le 01/09/2026</span>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex items-center justify-between">
                                        <span>Annulation</span>
                                        <span className="font-semibold text-slate-900">{isCancelled ? "Annulé" : "Actif"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Button variant="secondary" onClick={() => navigate("/abonnement")}>Changer de plan</Button>
                                <Button variant="danger" onClick={handleCancel}>Annuler l’abonnement</Button>
                            </div>
                        </Card>
                    </div>

                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-slate-900">Prochaines étapes</h2>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-600" />Créer votre première élection</li>
                            <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-600" />Ajouter vos premiers électeurs</li>
                            <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-600" />Valider les candidatures</li>
                        </ul>
                        <Button variant="primary" className="w-full mt-6" onClick={() => navigate("/supervision")}>Aller au tableau de bord</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
