import React from "react";
import { Link, NavLink,} from "react-router-dom";

export default function SideBar({ paths }) {
  return (
    <div className="w-64 h-screen bg-white p-6 shadow-2xl  fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <ul className="space-y-4">
          {
            paths.map( (path, index) => {
              return (
                <li key={index} className="flex items-center text-gray-800 hover:text-red-400 cursor-pointer font-bold">
                  <NavLink to={path.path}>{path.pathName}</NavLink>
                </li>
              )
            })
          }
          {/* <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <NavLink to="/supervision">Tableau de bord</NavLink>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <NavLink to="candidatures/">Gestion des Candidatures</NavLink>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <NavLink to="electeurs/">Gestion des Électeurs</NavLink>
          </li>
          <li className="flex items-center text-gray-800 hover:text-blue-600 cursor-pointer">
            <NavLink to="elections/">Élections Actuelles</NavLink>
          </li> */}
        </ul>
      </div>

      <div className="mb-4">
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 my-4">
          <Link to={'/'}>Acceuil</Link>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={()=>{
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("super_vote_user");
          }}
        >
          <Link to={'/Connexion'}>Déconnexion</Link>
        </button>
      </div>
    </div>
  );
}
