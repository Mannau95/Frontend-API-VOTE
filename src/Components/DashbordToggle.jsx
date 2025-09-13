import React, { useState, useRef, useEffect } from "react";

import Dashbord from "./Dashbord";

const DashbordToggle = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNav(!showNav)}
        className="m-4 text-2xl text-white focus:outline-none"
      >
        ☰
      </button>

      {showNav && (
        <div
          ref={navRef}
          className="absolute top-16 left-0 w-64 bg-white shadow-lg transition-all duration-300 animate-slide-in"
        >
          <Dashbord />
        </div>
      )}
    </div>
  );
};

export default DashbordToggle;
