import React from "react";
import { Outlet } from "react-router-dom";
import SideBarToggle from "../Components/SideBarToggle";


const DashboardSuperviseur = () => {
  // liste des sous routes
  const paths = [
    { "path": "/supervision", "pathName": "Tableau de bord"},
    { "path": "candidatures/", "pathName": "Gestion des Candidatures"},
    { "path": "electeurs/", "pathName": "Gestion des Électeurs"},
    { "path": "elections/", "pathName": "Élections Actuelles"},
  ]

  return (
    <div>

      <SideBarToggle paths={paths} />
      <div className="min-h-screen flex flex-col items-center justify-center p-8 ">
        <Outlet />
      
      </div>
    </div>
  );
};

export default DashboardSuperviseur;

