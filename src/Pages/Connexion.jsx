import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Se connecter</h2>
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
        <button className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
          Se connecter
        </button>
        <p className="text-sm text-blue-600">
          Pas de compte ?{" "}
          <Link to="/Sinscrire" className="text-blue-600">
            S’inscrire
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
