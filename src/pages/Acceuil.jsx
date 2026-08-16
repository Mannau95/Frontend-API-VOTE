import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar.jsx";
import Card from "../Components/ui/Card.jsx";
import Button from "../Components/ui/Button.jsx";
import {
  ShieldCheck,
  Zap,
  Users,
  FilePlus2,
  Send,
  BarChart3,
  Lock,
  MonitorSmartphone,
  Download,
  Building2,
  GraduationCap,
  Landmark,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: FilePlus2,
    title: "1. Créez votre élection",
    text: "Définissez les postes, les candidats et la période de vote en quelques minutes.",
  },
  {
    icon: Send,
    title: "2. Invitez vos électeurs",
    text: "Chaque électeur reçoit automatiquement un courriel avec un lien personnel et sécurisé.",
  },
  {
    icon: BarChart3,
    title: "3. Suivez les résultats",
    text: "Consultez la participation en direct et publiez des résultats fiables et transparents.",
  },
];

const features = [
  {
    icon: Lock,
    title: "Sécurité & confidentialité",
    text: "Lien de vote unique par électeur, données chiffrées et anonymat des bulletins garanti.",
  },
  {
    icon: Zap,
    title: "Résultats en temps réel",
    text: "Suivez la participation et les tendances pendant toute la durée du scrutin.",
  },
  {
    icon: MonitorSmartphone,
    title: "Accessible partout",
    text: "Vos électeurs votent depuis n'importe quel appareil, sans installation requise.",
  },
  {
    icon: Users,
    title: "Gestion simplifiée",
    text: "Importez vos électeurs et candidatures en quelques clics, gérez tout depuis un tableau de bord.",
  },
  {
    icon: Download,
    title: "Export & rapports",
    text: "Exportez les résultats et les statistiques de participation au format CSV.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité & traçabilité",
    text: "Chaque étape du scrutin est journalisée pour garantir des élections irréprochables.",
  },
];

const useCases = [
  { icon: Building2, label: "Entreprises" },
  { icon: Users, label: "Associations" },
  { icon: Landmark, label: "Copropriétés" },
  { icon: GraduationCap, label: "Écoles & universités" },
];

function Acceuil() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!user) {
      const access = localStorage.getItem("vote_access_token");
      if (!access) {
        navigate("/Connexion");
      }
    }
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: brancher sur un endpoint d'inscription newsletter quand il sera disponible côté API.
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
            Vote en ligne sécurisé
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            La solution de vote en ligne simple et fiable
          </h1>
          <p className="text-slate-500 text-lg">
            Créez un vote et vos électeurs reçoivent automatiquement un courriel avec
            un lien personnel pour voter. Que vous soyez une société, une association
            ou un groupe de personnes, Super Vote facilite l'organisation de vos
            décisions démocratiques.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            {user?.is_supervisor && (
              <Link to="/supervision">
                <Button variant="primary" className="h-11 px-5 text-base">
                  Créer une élection
                </Button>
              </Link>
            )}
            <Link to="/electeur">
              <Button
                variant={user?.is_supervisor ? "secondary" : "primary"}
                className="h-11 px-5 text-base"
              >
                Participer à une élection
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 mt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              Vote sécurisé
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              Résultats en direct
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              Électeurs illimités
            </span>
          </div>
        </div>

        {/* Visuel hero */}
        <div className="flex-1 w-full max-w-md">
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-indigo-50"></div>
            <div className="relative z-10 flex items-center justify-between mb-6">
              <p className="text-sm font-semibold text-slate-900">Élection du conseil</p>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full px-2.5 py-1">
                En cours
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              {[
                { name: "Participation", value: 72 },
                { name: "Candidat A", value: 46 },
                { name: "Candidat B", value: 31 },
              ].map((row) => (
                <div key={row.name}>
                  <div className="flex justify-between text-sm text-slate-500 mb-1">
                    <span>{row.name}</span>
                    <span className="text-slate-700 font-medium">{row.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${row.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Mail className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              Invitations envoyées automatiquement par courriel
            </div>
          </Card>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-2">
            Simple et rapide
          </p>
          <h2 className="text-3xl font-bold text-slate-900">Comment ça marche</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <Card key={step.title} className="p-6">
              <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-2">
            Pourquoi Super Vote
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Tout ce qu'il faut pour un scrutin réussi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-indigo-600" strokeWidth={2} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CAS D'USAGE */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-2">
            Pour tous les collectifs
          </p>
          <h2 className="text-3xl font-bold text-slate-900">Adapté à votre organisation</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.label}
              className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm px-4 py-6 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <useCase.icon className="w-5 h-5 text-indigo-600" strokeWidth={2} />
              </div>
              <p className="text-sm font-medium text-slate-700">{useCase.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-8 py-10 md:py-12 text-center shadow-sm">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-indigo-500/40"></div>
          <div className="absolute -left-8 -bottom-10 w-32 h-32 rounded-full bg-indigo-400/30"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Prêt à organiser votre premier vote ?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Créez votre compte et lancez votre première élection en quelques minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {!user && (
                <Link to="/Sinscrire">
                  <button className="inline-flex items-center gap-1.5 bg-white text-indigo-700 hover:bg-indigo-50 transition-colors font-medium px-5 py-2.5 rounded-lg text-sm">
                    Créer un compte
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </Link>
              )}
              <Link to="/electeur">
                <button className="inline-flex items-center gap-1.5 bg-indigo-500/40 text-white hover:bg-indigo-500/60 transition-colors font-medium px-5 py-2.5 rounded-lg text-sm ring-1 ring-white/30">
                  Participer à une élection
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Card className="px-8 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center">
            <Mail className="w-6 h-6 text-indigo-600" strokeWidth={2} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Restez informé des nouveautés Super Vote
            </h3>
            <p className="text-sm text-slate-500">
              Conseils sur l'organisation de vos élections, nouvelles fonctionnalités
              et bonnes pratiques, directement dans votre boîte courriel.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg px-4 py-2.5">
                <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                Merci ! Vous êtes inscrit.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse courriel"
                  className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <Button type="submit" variant="primary" className="h-10 shrink-0">
                  S'abonner
                </Button>
              </form>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
export default Acceuil;
