import React from "react";
import {FormatDate} from "../utils/formatDate";

export default function ElectionCard({election, btnTitle = "Postuler", hasBtn = true, onClick = null}) {
    return (
        <div className="px-6 py-4 shadow-xs bg-white rounded-xs  text-center">
            <img
                src="/img/election_pict.png" //{election.image}
                alt="groupe de personnes"
                className="w-full h-35"
            />
            <div className="font-medium text-2xl">{election.name}</div>
            <div className="text-2xs font-light text-left">

                <p className="text-justify">{election.description}</p>
                <p className="mt-2">
                    Date limite: <span className="font-medium">{FormatDate.fromIsoToString(election.begin_date)}</span>
                </p>
            </div>
            {
                hasBtn ?
                    <button className=" bg-blue-600 text-white mt-4 border-0 w-full h-10" onClick={() => {if(onClick) onClick()} }>
                        {btnTitle}
                    </button> :
                    null
            }
        </div>
    );
}
