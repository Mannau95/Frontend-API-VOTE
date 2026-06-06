import React from "react";

export default function CheckBox ({checked, onChange}) {
    return <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
    />
}