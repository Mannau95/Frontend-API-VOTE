import React from "react";
import {FormatDate} from "../utils/formatDate";

export default function ElectionCard({election, btnTitle = "Postuler", hasBtn = true}) {
    return (
        <div className="px-10 py-4 shadow-xs bg-white rounded-xs">
            <img
                src="/img/election_pict.png" //{election.image}
                alt="groupe de personnes"
                className="w-full h-35"
            />
            <div className="font-medium text-2xl">{election.name}</div>
            <div className="text-2xs font-light">

                <p className="text-justify">{election.description}</p>
                <p className="mt-2">
                    Date limite: <span className="font-medium">{FormatDate.fromIsoToString(election.begin_date)}</span>
                </p>
            </div>
            {
                hasBtn ?
                    <button className=" bg-blue-600 text-white mt-4 border-0 w-full h-10">
                        {btnTitle}
                    </button> :
                    null
            }
        </div>
    );
}
