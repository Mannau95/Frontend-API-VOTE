import React from "react";

const Navigation = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-6 border-r fixed top-0 left-0">
      <h3 className="text-sm text-gray-600 font-semibold mb-6">NAVIGATION</h3>
      <ul className="space-y-4">
        <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
          <span>Mes Candidatures</span>
        </li>
        <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
          <span>Élections Actuelles</span>
        </li>
        <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
          <span>Paramètres Utilisateur</span>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
