import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
//import { vote } from "./Pages/Participer vote.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("super_vote_user");
    navigate("/Connexion");
  };

  const userState = useSelector(state => state.user)

  return (
    <>
      <div className="navbar bg-red-400 shadow-sm text-white">
        <div className="navbar-start">
            <a className=" font-bold cursor-pointer px-4 py-2 text-lg ">SUPER VOTE</a>
          </div>
        <div className="navbar-center ">
          
          <ul className="menu menu-horizontal px-1 font-semibold text-[1rem]">
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>

            <li>
              <NavLink to="/supervision">Créer une élection</NavLink>
            </li>

            <li>
              <NavLink to="/electeur">Participer à une élection</NavLink>
            </li>
            <li>
              <NavLink to="/Connexion">Se connecter</NavLink>
            </li>
          </ul>
        </div>

        { userState.user &&
          <div className="navbar-end pr-6 gap-3">
            <input
              type="text"
              placeholder="Search"
              // value={search}
              //onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-20 md:w-auto bg-white text-black"
            />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" rounded-full">
                  <img
                    alt="Profil image"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Navbar;
