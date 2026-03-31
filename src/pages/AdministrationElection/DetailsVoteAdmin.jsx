import React, {useEffect, useMemo, useState} from 'react';
import {Settings} from "lucide-react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {FormatDate} from "../../utils/formatDate.js";

function DetailsVoteAdmin() {
    const {id} = useParams();
    const { elections } = useSelector( state => state.elections);
    const [election, setElection] = useState([]);

    useEffect( ()=> {
         setElection(elections.find( (e)=> e.id == id))
    }, [elections])

    return (
        <div>
            <div className="flex justify-between mb-8">
                <h2>Détails de l'Election</h2>

                <button className="btn bg-blue-500" onClick={() => {}}>
                    <Settings size={16}/>
                    Modifier l'élection
                </button>
            </div>

            <div className="bg-white text-gray-600 ">
                <div className="flex px-4">
                    <div className="flex-2/3">
                        <div className="my-5 mx-2 px-8 py-5 border border-gray-100 rounded-lg text-2xs">
                            <h3>Aperçu</h3>
                            <h3>Nom de l'élection : {election?.name}</h3>
                            <p className="text-sm text-gray-600 font-medium">
                                {election?.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1/3">
                        <div className="my-5 mx-2 px-8 py-5 border border-gray-100 rounded-lg">
                            <h3>Statut & Dates</h3>
                            <div className="text-blue-500">Statut courant: <span>En cours</span></div>
                            <div>Date: {FormatDate.fromIsoToString(election.begin_date)}</div>
                            <div>Fin: {FormatDate.fromIsoToString(election.end_date)}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetailsVoteAdmin;