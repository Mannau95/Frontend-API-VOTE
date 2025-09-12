import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (mdp !== confirm) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Inscription</h2>

        <input
          type="email"
          placeholder="E-mail"
          required
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          className="w-full border p-2 rounded"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          required
          className="w-full border p-2 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600">
          S’inscrire
        </button>

        <p className="text-sm">
          Déjà un compte ?{" "}
          <Link to="/Connexion" className="text-blue-600">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
