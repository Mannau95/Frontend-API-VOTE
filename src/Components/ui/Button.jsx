import React from 'react';

const VARIANTS = {
    primary: "bg-indigo-600 text-white border border-transparent hover:bg-indigo-700",
    secondary: "text-slate-600 border border-slate-300 hover:bg-slate-50",
    danger: "text-white bg-red-600 border border-transparent hover:bg-red-700",
};

function Button({children, onClick = ()=>{}, className = "", variant = "secondary", disabled = false, type = "submit", ...rest}) {
    return (
        <button onClick={onClick} disabled={disabled} type={type}
            className={`inline-flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] ?? VARIANTS.secondary} ${className}`}
            {...rest}>
            {children}
        </button>
    );
}

export default Button;