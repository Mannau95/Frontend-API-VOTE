import React from 'react';
import {Search} from "lucide-react";

function SearchBar({placeholder, className}) {
    return (
        <div className="relative text-xs">
            <Search size={15} className="absolute  translate-y-[55%] left-2 z-5" />
            <input type="text" placeholder={placeholder ?? "Rechercher"} id="Search"
                   className={"pl-7 py-2 border border-gray-300 rounded-xs focus:ring-0 " +
                       `${className}`} />
        </div>
    );
}

export default SearchBar;