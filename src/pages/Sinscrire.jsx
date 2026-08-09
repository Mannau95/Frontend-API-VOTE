import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { httpAxiosClient } from "../client/httpClient";
import { login } from "../store/userSlice.js";
import { SUPERVISOR_DASHBOARD } from "../constants/urls.js";

export default function Sinscrire() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        organisation_name: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSubmitting(true);
        try {
            await httpAxiosClient.post("/auth/signup/", form);
            const result = await dispatch(login({ email: form.email, password: form.password }));
            if (login.fulfilled.match(result)) {
                navigate("/abonnement");
            } else {
                // Le compte a bien été créé, mais la connexion automatique a échoué : on
                // renvoie l'utilisateur se connecter manuellement plutôt que de bloquer.
                navigate("/Connexion");
            }
        } catch (error) {
            setErrorMessage(error?.message ?? "Erreur lors de la création du compte.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center text-slate-900">Créer un compte</h2>
                <p className="text-sm text-slate-500 text-center mb-6">
                    Créez votre organisation et commencez à organiser vos élections.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-slate-700 mb-1">Prénom</label>
                            <input
                                type="text" required value={form.first_name} onChange={onChange("first_name")}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-700 mb-1">Nom</label>
                            <input
                                type="text" required value={form.last_name} onChange={onChange("last_name")}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-700 mb-1">Nom de l'organisation</label>
                        <input
                            type="text" required value={form.organisation_name} onChange={onChange("organisation_name")}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-700 mb-1">E-mail</label>
                        <input
                            type="email" required value={form.email} onChange={onChange("email")}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-700 mb-1">Mot de passe</label>
                        <input
                            type="password" required value={form.password} onChange={onChange("password")}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Création en cours..." : "Créer mon compte"}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Déjà un compte ? <Link to="/Connexion" className="text-indigo-600 font-medium hover:text-indigo-700">Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
