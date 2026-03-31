import React from 'react';
import {useParams} from "react-router-dom";

function CandidatureDetail() {
    const {candidatureId} = useParams();
    return (
        <div>Ma candidature id: {candidatureId}</div>
    );
}

export default CandidatureDetail;