import React from 'react';
import {Search} from "lucide-react";

function SearchBar({
   placeholder,
    value,
   onChange,
   className
}) {
    return (
        <div className="relative text-sm">
            <Search size={15} className="absolute translate-y-[55%] left-2 z-5 text-gray-500"/>
            <input
                value={value}
                onChange={onChange}
                type="text"
                placeholder={placeholder ?? "Rechercher"}
                id="Search"
                className={"pl-7 py-2 border border-gray-300 rounded-sm focus:ring-0 " +
                    `${className}`}
            />
        </div>
    );
}

export default SearchBar;