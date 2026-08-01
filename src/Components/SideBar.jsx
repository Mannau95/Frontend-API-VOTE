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
    <div className=" pt-4 px-3 flex flex-col justify-between h-screen w-full">
      <div>
        <ul className="space-y-4">
          {
            paths.map( (path, index) => {
              return (
                <NavLink to={path.path} key={index}>
                  <li className={"flex items-center text-sm cursor-pointer px-4 py-2 rounded-lg " +
                      (isActive(path.path)
                        ? "font-medium bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100")}>
                    {path.pathName}
                  </li>
                </NavLink>
              )
            })
          }
        </ul>
      </div>

      <div className="mb-4">
        <Link to={'/'} >
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors my-4">
            Accueil
          </button>
        </Link>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
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
