import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

function Acceuil() {
  return (
    <div>
      <Navbar />
      <div className="  items-center justify-between  flex flex-wrap gap-4 p-20">
        <div className="m-auto flex flex-col gap-3 min-h-[70dvh]  w-[55%] justify-around">
          <p className="font-bold text-3xl text-red-400 text-center" id="title">
            La solution de vote en ligne simple et fiable
          </p>
          <div
            id="content"
            className="text-2xl p-10 text-justify italic flex flex-col gap-4"
          >
            {/* <p>
              Créez un vote et les électeurs recevront automatiquement un courriel
              avec un lien personnel pour voter.
            </p> */}
            <p>
              Créez un vote et les électeurs recevront automatiquement un
              courriel avec un lien personnel pour voter.
            </p>
            <p>
              Que vous soyez une société, une association ou un groupe de
              personnes, Super vote facilite l'organisation de vos votes en
              ligne.
            </p>
            <p>Organisez vos décisions démocratiques facilement.</p>
          </div>

          <button className="bg-red-400 hover:bg-red-500 transition text-white py-2 px-4 rounded text-xl font-bold">
            <Link to="/supervision">Créer un vote</Link>
          </button>
        </div>

        <img src="./image.jpg" alt="*" className=" h-50" />
      </div>
    </div>
  );
}
export default Acceuil;
