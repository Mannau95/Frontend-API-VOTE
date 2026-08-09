import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/Card.jsx";
import Button from "../Components/ui/Button.jsx";
import { Users, MailPlus, ShieldCheck, Clock3 } from "lucide-react";

const INITIAL_INVITATIONS = [
    { id: 1, email: "alex@company.com", role: "Superviseur", status: "En attente" },
    { id: 2, email: "nina@company.com", role: "Électeur", status: "Acceptée" },
];

export default function EquipePage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("superviseur");
    const [invitations, setInvitations] = useState(INITIAL_INVITATIONS);

    const members = useMemo(() => [
        { id: 1, name: user?.first_name ? `${user.first_name} ${user.last_name}`.trim() : "Vous", role: "Propriétaire", status: "Actif" },
    ], [user]);

    const handleInvite = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setInvitations((prev) => [
            ...prev,
            { id: Date.now(), email: email.trim(), role: role === "superviseur" ? "Superviseur" : "Électeur", status: "En attente" },
        ]);
        setEmail("");
        setRole("superviseur");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Mon organisation</p>
                        <h1 className="text-3xl font-bold text-slate-900 mt-2">Équipe et invitations</h1>
                        <p className="text-slate-600 mt-2">Gérez les superviseurs et les accès associés à votre organisation.</p>
                    </div>
                    <Button variant="secondary" onClick={() => navigate("/organisation")}>Retour à l’organisation</Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="rounded-full bg-indigo-600 p-2 text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Membres de l’organisation</h2>
                                <p className="text-sm text-slate-500">Vue d’équipe de base pour l’onboarding.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {members.map((member) => (
                                <div key={member.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <div>
                                        <p className="font-semibold text-slate-900">{member.name}</p>
                                        <p className="text-sm text-slate-500">{member.role}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        {member.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                                <MailPlus className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Inviter un membre</h2>
                                <p className="text-sm text-slate-500">Ajoutez des superviseurs ou électeurs.</p>
                            </div>
                        </div>

                        <form onSubmit={handleInvite} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@exemple.com"
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            >
                                <option value="superviseur">Superviseur</option>
                                <option value="electeur">Électeur</option>
                            </select>
                            <Button variant="primary" className="w-full">Envoyer l’invitation</Button>
                        </form>

                        <div className="mt-6 space-y-3">
                            <h3 className="text-sm font-semibold text-slate-900">Invitations en cours</h3>
                            {invitations.map((invitation) => (
                                <div key={invitation.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600">
                                    <div>
                                        <p className="font-medium text-slate-900">{invitation.email}</p>
                                        <p>{invitation.role}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock3 className="w-4 h-4 text-slate-400" />
                                        {invitation.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
