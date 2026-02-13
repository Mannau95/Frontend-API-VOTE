import React, { useState, useRef, useEffect } from "react";

import SideBar from "./SideBar";

const SideBarToggle = ({ paths}) => {
  // la liste des sous routes est dans const paths = 
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
    <div className="sticky top-0 bg-white m-0 overflow-auto h-screen">
        {!showNav &&
            <button
                onClick={() => setShowNav(!showNav)}
                className="m-4 text-3xl focus:outline-none text-black lg:hidden"
            >
                ☰
            </button>
        }

      {showNav && (
        <div
          ref={navRef}
          className="flex lg-hidden w-58 transition-all duration-300 animate-slide-in"
        >
          <SideBar paths={paths}/>
        </div>
      )}
        <div
            // ref={navRef}
            className="hidden lg:flex w-58 transition-all duration-300 animate-slide-in h-screen"
        >
            <SideBar paths={paths} />
        </div>
    </div>
  );
};

export default SideBarToggle;
