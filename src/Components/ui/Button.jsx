import React from 'react';

const VARIANTS = {
    primary: "bg-indigo-600 text-white border border-transparent hover:bg-indigo-700",
    secondary: "text-slate-600 border border-slate-300 hover:bg-slate-50",
    danger: "text-white bg-red-600 border border-transparent hover:bg-red-700",
};

function Button({children, onClick = ()=>{}, className = "", variant = "secondary"}) {
    return (
        <button onClick={onClick}
            className={`inline-flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${VARIANTS[variant] ?? VARIANTS.secondary} ${className}`}>
            {children}
        </button>
    );
}

export default Button;