import React, { useState } from "react";
import { httpAxiosClient } from "../client/httpClient";
import { data } from "autoprefixer";
// import axios from "axios";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const handleConnexion = async (e) => {
    e.preventDefault();

    try {
      const response = await httpAxiosClient.post(
        '/auth/login/',
        {
          email, 
          password: motDePasse
        }
      )
      // await axios.post(
      //   "http://localhost:8000/api/v2/users/<int:pk>/",
      //   {
      //     email,
      //     mot_de_passe: motDePasse,
      //   }
      // );

      console.log("Connecté avec succès", response.data);
    } catch (error) {
      console.error(error);
      setErreur(
        "Vos identifiants sont incorrects, veuillez les vérifier à nouveau."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleConnexion} className="space-y-4">
          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
