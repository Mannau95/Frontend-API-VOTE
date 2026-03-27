import React from 'react';

function DefaultValue({ className, defaultValue }) {
    return (
        <div className={className + " flex w-full"}>
            <p className="m-auto">{defaultValue}</p>
        </div>
    );
}

export default DefaultValue;