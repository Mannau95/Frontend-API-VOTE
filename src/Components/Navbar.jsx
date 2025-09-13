import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
//import { vote } from "./Pages/Participer vote.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Connexion");
  };
  return (
    <>
      <div className="navbar bg-red-400 shadow-sm">
        <div className="">
          <a className="btn btn-ghost text-xl  ">SUPER VOTE</a>
        </div>
        <div className="navbar-center hi">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  <NavLink to="/">Pour Qui?</NavLink>
                </summary>
              </details>
            </li>

            <li>
              <NavLink to="/CréerUnVote">Créer un vote</NavLink>
            </li>

            <li>
              <NavLink to="/Vote">Participer à un vote</NavLink>
            </li>
            <li>
              <NavLink to="/Connexion">Se connecter</NavLink>
            </li>
          </ul>
        </div>

        <div className=" navbar-end">
          <input
            type="text"
            placeholder="Search"
            // value={search}
            //onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
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
      </div>
    </>
  );
};

export default Navbar;
