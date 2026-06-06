import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigateToggle from "../Components/NavigateToggle.jsx";
import SideBarToggle from "../Components/SideBarToggle.jsx";
import {useSelector} from "react-redux";

export default function DashboardElector() {
    const {user} = useSelector((state) => state.user);
  // liste des sous routes
  const paths = [
    { "path": "/electeur", "pathName": "Tableau de bord"},
    { "path": "candidatures/", "pathName": "Mes Candidatures"},
    { "path": "elections/", "pathName": "Élections Actuelles"},
    { "path": "profile/", "pathName": "Paramètres Utilisateur"},
  ]
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/Connexion");
    }
  }, [navigate, user]);
  return (
    <div className="flex w-full">
      {/* <NavigateToggle /> */}
      <SideBarToggle paths={paths}/>
      <div className="overflow-auto flex-[4] items-center justify-center p-8 relative bg-white">
        {/* <h1 className="text-2xl text-red-500 font-bold mb-4">Participer à un Vote</h1> */}
        <Outlet />
      </div>
    </div>
  );
}
