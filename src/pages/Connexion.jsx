import React, { useState } from "react";
// import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../store/userSlice.js";
import { useDispatch } from "react-redux";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleConnexion = async (e) => {
    e.preventDefault();
    const errorMessage = "Vos identifiants sont incorrects, veuillez les vérifier à nouveau."

    try {
        dispatch(login({email, password: motDePasse})).then((result) => {
            if(!login.fulfilled.match(result)) {
                setErreur(errorMessage);
            }
        })

      navigate("/");
    } catch (error) {
      console.error(error);
      setErreur(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 min-h-[70dvh] w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Connexion</h2>
        <form onSubmit={handleConnexion} className="space-y-4">
          <div>
            <label htmlFor='email' className="block text-sm text-slate-700 mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
          <div>
            <label htmlFor='pw' className="block text-sm text-slate-700 mb-1">Mot de passe</label>
            <input
              id='pw'
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Se connecter
          </button>

            <p className="text-indigo-600 flex">
                <Link to="/startSetPassword" className="ml-auto text-sm font-medium hover:text-indigo-700">
                     Mot de passe oublié?
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}
