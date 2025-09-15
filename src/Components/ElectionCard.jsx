import React from "react";

export default function ElectionCard({ election }) {
  return (
    <div className="px-10 py-4 min-w-75 w-[23%] shadow-xs bg-white hover:scale-105 rounded-lg">
      <img
        src={election.image}
        alt="groupe de personnes"
        className="w-full h-25"
      />
      <h3 className="font-semibold text-xl">{election.title}</h3>
      <p className="text-justify">{election.description}</p>
      <p className="mt-4">
        Date limite: <span className="font-medium">{election.begin_date}</span>
      </p>
      <button className="btn bg-blue-400 hover:bg-blue-500 text-white mt-4 border-0 w-full">
        Postuler
      </button>
    </div>
  );
}
