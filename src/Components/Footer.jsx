import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="max-w-xs">
          <span className="font-bold text-lg text-slate-900">SUPER VOTE</span>
          <p className="text-sm text-slate-500 mt-2">
            La solution de vote en ligne simple et fiable pour les entreprises,
            associations et organisations.
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">
              Navigation
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Accueil</Link></li>
              <li><Link to="/electeur" className="hover:text-indigo-600 transition-colors">Participer à une élection</Link></li>
              <li><Link to="/Connexion" className="hover:text-indigo-600 transition-colors">Se connecter</Link></li>
              <li><Link to="/Sinscrire" className="hover:text-indigo-600 transition-colors">Créer un compte</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">
              Contact
            </p>
            <a
              href="mailto:contact@supervote.app"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
              contact@supervote.app
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-400 text-center">
          © {year} Super Vote. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
