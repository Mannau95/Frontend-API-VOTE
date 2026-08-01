import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("vote_access_token");
    localStorage.removeItem("vote_refresh_token");
    localStorage.removeItem("vote_user");
    navigate("/Connexion");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-indigo-100 hover:text-white"
    }`;

  return (
    <div className="bg-indigo-700 shadow-sm text-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <span className="font-bold cursor-pointer text-lg">SUPER VOTE</span>

        <ul className="hidden md:flex items-center gap-1">
          <li>
            <NavLink to="/" className={linkClass}>Accueil</NavLink>
          </li>
          {user?.is_supervisor && (
            <li>
              <NavLink to="/supervision" className={linkClass}>Créer une élection</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/electeur" className={linkClass}>Participer à une élection</NavLink>
          </li>
          {!user && (
            <li>
              <NavLink to="/Connexion" className={linkClass}>Se connecter</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="w-9 h-9 rounded-full bg-indigo-800 hover:bg-indigo-900 transition-colors flex items-center justify-center text-sm font-semibold"
            >
              {user?.username?.[0]?.toUpperCase() ?? "?"}
            </button>

            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-44 rounded-lg bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 py-1 z-10">
                <li>
                  <a className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer">Profil</a>
                </li>
                <li>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer">Déconnexion</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
