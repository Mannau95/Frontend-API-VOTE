import React from 'react';

function Button({children, onClick = ()=>{}, className = ""}) {
    return (
        <button onClick={onClick }
            className={ "border border-gray-300 inline-flex text-sm font-medium px-4 py-2 rounded-lg transition-colors " + className}>
            {children}
        </button>
    );
}

export default Button;