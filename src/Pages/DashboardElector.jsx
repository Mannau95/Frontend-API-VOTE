import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigateToggle from "../Components/NavigateToggle.jsx";

export default function DashboardElector() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/Connexion");
    }
  }, [navigate]);
  return (
    <div>
      <NavigateToggle />
      <div className="ml-64 p-6 min-h-[84dvh]">
        <h1 className="text-2xl text-red-500 font-bold mb-4">Participer à un Vote</h1>
      </div>
    </div>
  );
}
