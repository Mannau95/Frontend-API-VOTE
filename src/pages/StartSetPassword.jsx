import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {httpAxiosClient} from "../client/httpClient.js";

export default function StartSetPassword() {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const emailFromUrl = searchParams.get("email");
  //   if (emailFromUrl) {
  //     setEmail(emailFromUrl);
  //   } else {
  //     setMessage("❌ Lien invalide");
  //   }
  // }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await httpAxiosClient
          .post(`/users/reset_password/get_reset_link/`, {email: email});

      setMessage("✅ Inscription terminée. Redirection...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold m-6 text-center">
            Super Vote
        </h1>
        <h2 className="text-lg mb-4">
          Veuillez entrer votre mail pour changer de mot de passe
        </h2>

        {message && <p className="mb-4 text-center text-sm">{message}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">E-mail</label>
          <input
            id="email"
            type="email"
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border p-2 rounded bg-gray-100 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Recevoir un mail
        </button>
      </form>
    </div>
  );
}
