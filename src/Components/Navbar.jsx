import React, {useEffect} from "react";
// import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
//import { useState, useEffect } from "react";
//import { vote } from "./Pages/Participer vote.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
    // userState = JSON.parse(localStorage.getItem("vote_user"));

  const handleLogout = () => {
    localStorage.removeItem("vote_access_token");
    localStorage.removeItem("vote_refresh_token");
    localStorage.removeItem("vote_user");
    navigate("/Connexion");
  };


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
                {user?.is_supervisor && <NavLink to="/supervision">Créer une élection</NavLink>}
            </li>

            <li>
              <NavLink to="/electeur">Participer à une élection</NavLink>
            </li>
            {
              !user &&
              (<li>
                <NavLink to="/Connexion">Se connecter</NavLink>
              </li>)
            }
          </ul>
        </div>

        { user &&
          <div className="navbar-end pr-6 gap-3">
            <input
              type="text"
              placeholder="Recherche"
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
