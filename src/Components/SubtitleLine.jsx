import React from 'react';
import {Link} from "react-router-dom";

function SubtitleLine({ title , actionRoute , actionTitle }) {
    return (
        <div className="flex justify-between items-center mb-2">
            <h3>{title}</h3>
            {actionTitle && <Link to={actionRoute}>
                <button>{actionTitle}</button>
            </Link>}
        </div>
    );
}

export default SubtitleLine;