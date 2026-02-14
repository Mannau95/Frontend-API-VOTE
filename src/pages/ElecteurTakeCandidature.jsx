import React from 'react';
import {useParams} from "react-router-dom";
import {getElectionById} from "../utils/local_storage/election_storage.js";

function ElecteurTakeCandidature() {
    const {electionId} = useParams();
    const election = getElectionById(parseInt(electionId))
    return (
        <div className='px-6 bg-gray-50'>
            <h1 className='text-2xl font-semibold mb-6'>Poser votre candidature</h1>

            <div id="infos" className='text-[.8rem] bg-blue-100 my-3 p-3 flex justify-between rounded-lg'>
                <p>Inspectez les détails de l'élection afin de mieux formuler votre candidature. </p>
            </div>

            <h2 className="font-medium pt-4">Aperçu d'élection</h2>
            <div>
                <p className="text-[.8rem] font-medium">Nom de l'Election: {election?.name}</p>
            </div>
        </div>
    );
}

export default ElecteurTakeCandidature;