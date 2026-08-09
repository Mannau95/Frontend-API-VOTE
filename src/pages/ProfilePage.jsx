import { useSelector } from "react-redux";
import Card from "../Components/ui/Card.jsx";
import { User, Mail, ShieldCheck, CalendarDays } from "lucide-react";
import { FormatDate } from "../utils/formatDate.js";

export default function ProfilePage() {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return null;
    }

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";
    const roles = [];

    if (user.is_supervisor) roles.push("Superviseur");
    if (user.is_elector) roles.push("Électeur");
    if (user.is_candidate) roles.push("Candidat");

    return (
        <div className="w-full max-w-3xl space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <User size={22} />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Profil utilisateur</h1>
                        <p className="text-sm text-slate-500">Informations personnelles et accès</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <Card className="p-6">
                    <h2 className="mb-4 text-base font-semibold text-slate-900">Informations de base</h2>
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-slate-400" />
                            <span>{fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-slate-400" />
                            <span>{user.email || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-slate-400" />
                            <span>{roles.length ? roles.join(" · ") : "Aucun rôle"}</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="mb-4 text-base font-semibold text-slate-900">Détails du compte</h2>
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-slate-400" />
                            <span>
                                Créé le : {user.created_at ? FormatDate.fromIsoToString(user.created_at) : "—"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-slate-400" />
                            <span>
                                Dernière mise à jour : {user.updated_at ? FormatDate.fromIsoToString(user.updated_at) : "—"}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
