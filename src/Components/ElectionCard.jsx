import React from "react";
import { FormatDate } from "../utils/formatDate";

export default function ElectionCard({ election, btnTitle="Postuler" , hasBtn=true}) {
  return (
    <div className="px-10 py-4 min-w-75 w-[23%] shadow-xs bg-white hover:scale-105 rounded-lg">
      <img
        src="/img/election_pict.png" //{election.image}
        alt="groupe de personnes"
        className="w-full h-35"
      />
      <h3 className="font-semibold text-xl">{election.name}</h3>
      <p className="text-justify">{election.description}</p>
      <p className="mt-4">
        Date limite: <span className="font-medium">{FormatDate.fromIsoToString( election.begin_date)}</span>
      </p>
      {
        hasBtn ? 
        <button className="btn bg-blue-400 hover:bg-blue-500 text-white mt-4 border-0 w-full">
          {btnTitle}
        </button> :
        null
      }
    </div>
  );
}
