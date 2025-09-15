import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Sinscrire2() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      setMessage("❌ Lien invalide");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/v2/users/<int:pk>/", {
        email,
        password,
      });

      setMessage("✅ Inscription terminée. Redirection...");
      setTimeout(() => navigate("/connexion"), 2000);
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
        <h2 className="text-xl font-semibold mb-4">
          Définir votre mot de passe
        </h2>

        {message && <p className="mb-4 text-center text-sm">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">E-mail</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
