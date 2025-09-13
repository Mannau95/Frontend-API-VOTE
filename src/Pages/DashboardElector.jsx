import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigateToggle from "../Components/NavigateToggle.jsx";
import SideBar from "../Components/SideBar.jsx";

export default function DashboardElector() {
  // liste des sous routes
  const paths = [
    { "path": "/electeur", "pathName": "Tableau de bord"},
    { "path": "candidatures/", "pathName": "Mes Candidatures"},
    { "path": "elections/", "pathName": "Élections Actuelles"},
    { "path": "profile/", "pathName": "Paramètres Utilisateur"},
  ]
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/Connexion");
    }
  }, [navigate]);
  return (
    <div>
      {/* <NavigateToggle /> */}
      <SideBar paths={paths}/>
      <div className="ml-64 p-6 min-h-[84dvh]">
        {/* <h1 className="text-2xl text-red-500 font-bold mb-4">Participer à un Vote</h1> */}
        <Outlet />
      </div>
    </div>
  );
}
