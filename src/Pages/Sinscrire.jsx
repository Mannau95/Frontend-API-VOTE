import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sinscrire() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const navigate = useNavigate();

  const handleCheckEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v2/users/<int:pk>/",
        {
          email,
        }
      );

      const { existe, aPassword } = res.data;

      if (!existe) {
        setMessage("❌ E-mail incorrecte");
        setShowLoginBtn(false);
      } else if (aPassword) {
        setMessage("✅ Vous avez déjà un compte.");
        setShowLoginBtn(true);
      } else {
        setMessage(
          "📧 Un lien vous a été envoyé par mail pour finaliser l’inscription."
        );
        setShowLoginBtn(false);
        // Envoie du lien d'inscription 2
        await axios.post("http://localhost:8000/api/envoyer-lien-inscription", {
          email,
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur serveur.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">S'inscrire</h1>

        <input
          type="email"
          placeholder="Entrez votre email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleCheckEmail}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Vérifier
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}

        {showLoginBtn && (
          <button
            onClick={() => navigate("/connexion")}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
}
