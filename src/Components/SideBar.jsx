import React from "react";
import { Link } from "react-router-dom";

const TableauDeBord = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-6 border-r fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <ul className="space-y-4">
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <h3 to="/dashboard">Tableau de bord</h3>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <Link to="/candidatures">Gestion des Candidatures</Link>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <Link to="/electeurs">Gestion des Électeurs</Link>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <Link to="/elections">Élections Actuelles</Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default TableauDeBord;
