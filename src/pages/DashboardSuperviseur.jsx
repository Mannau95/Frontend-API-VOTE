import React from "react";
import { Outlet } from "react-router-dom";
import SideBarToggle from "../Components/SideBarToggle";

const DashboardSuperviseur = () => {
  // liste des sous routes
  const paths = [
    { path: "/supervision", pathName: "Tableau de bord" },
    { path: "candidats/", pathName: "Gestion des Candidatures" },
    { path: "electeurs/", pathName: "Gestion des Électeurs" },
    { path: "elections/", pathName: "Administration des Élections" },
  ];

  return (
      <div className="flex w-full">
          <SideBarToggle paths={paths}/>
          <div className="overflow-auto flex-[4] items-center justify-center p-8 relative bg-gray-100">
              {/* <h1 className="text-2xl text-red-500 font-bold mb-4">Participer à un Vote</h1> */}
              <Outlet />
          </div>
      </div>
  );
};

export default DashboardSuperviseur;
