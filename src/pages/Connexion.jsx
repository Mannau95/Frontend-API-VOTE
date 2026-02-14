import React, { useState } from "react";
import { httpAxiosClient } from "../client/httpClient";
// import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {login, setUser} from "../store/userSlice.js";
import { useDispatch } from "react-redux";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleConnexion = async (e) => {
    e.preventDefault();

    try {
        await dispatch(login({email, password: motDePasse})).unwrap()
      // const response = await httpAxiosClient.post("/auth/login/", {
      //   email,
      //   password: motDePasse,
      // });
      // // await axios.post(
      // //   "http://localhost:8000/api/v2/users/<int:pk>/",
      // //   {
      // //     email,
      // //     mot_de_passe: motDePasse,
      // //   }
      // // );
      //
      // console.log("Connecté avec succès", response.data);
      //
      // dispatch(setUser(response.data))

      navigate("/");
    } catch (error) {
      console.error(error);
      setErreur(
        "Vos identifiants sont incorrects, veuillez les vérifier à nouveau."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md min-h-[70dvh] w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-400">Connexion</h2>
        <form onSubmit={handleConnexion} className="space-y-4">
          <div>
            <label htmlFor='email' className=" mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor='pw' className=" mb-1">Mot de passe</label>
            <input
              id='pw'
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
            className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500 transition-all font-semibold"
          >
            Se connecter
          </button>

            <p className="text-red-600 flex">
                <Link to="/startSetPassword" className="ml-auto">
                     Mot de passe oublié?
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}
