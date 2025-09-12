import React from "react";

import { Link } from "react-router-dom";

function Acceuil() {
  return (
    <div>
      <div className="   items-center justify-between  flex flex-wrap gap-4 p-20">
        <span>
          <p className="font-bold text-2xl text-red-400 ">
            La solution de vote en ligne simple et fiable
          </p>
          <p>
            Créez un vote et les électeurs recevront automatiquement un courriel
            avec un lien personnel pour voter.
          </p>
          <p>
            Créez un vote et les électeurs recevront automatiquement un courriel
            avec un lien personnel pour voter.
          </p>
          <p>
            Que vous soyez une société, une association ou un groupe de
            personnes,
            <br /> Balotilo facilite l'organisation de vos votes en ligne.
            Organisez vos décisions démocratiques facilement.
          </p>
        </span>

        <img src="./image.jpg" alt="*" className=" h-50" />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        <Link to="/CréerUnVote">Créer un vote</Link>
      </button>
    </div>
  );
}
export default Acceuil;
