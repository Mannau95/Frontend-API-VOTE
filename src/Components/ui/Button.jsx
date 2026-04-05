import React from 'react';

function Button({children, onClick = ()=>{}, className = ""}) {
    return (
        <button onClick={onClick }
            className={ "border border-gray-300 px-3 py-2 flex gap-2" + className}>
            {children}
        </button>
    );
}

export default Button;