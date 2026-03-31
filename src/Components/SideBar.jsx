import React from "react";
import {Link, NavLink, useLocation,} from "react-router-dom";

export default function SideBar({ paths }) {
  const location = useLocation();

  const isActive = (path) => {
      return location.pathname.split("/").length < 3 ?
          location.pathname.split("/")[1] === path.split("/")[1] :
          location.pathname.split("/")[2] === path.split("/")[0]
  };

  return (
    <div className=" pt-4 pl-2 flex flex-col justify-between h-screen">
      <div>
        <ul className="space-y-4">
          {
            paths.map( (path, index) => {
              return (
                <NavLink to={path.path} key={index}>
                  <li className={"flex items-center text-sm text-gray-700 cursor-pointer font-medium px-4 py-2 " +
                      `${isActive(path.path) && " bg-gray-200 rounded-lg "}`}>
                    {path.pathName}
                  </li>
                </NavLink>
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
        <Link to={'/'} >
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 my-4">
            Acceuil
          </button>
        </Link>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={()=>{
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("vote_user");
          }}
        >
          <Link to={'/Connexion'}>Déconnexion</Link>
        </button>
      </div>
    </div>
  );
}
