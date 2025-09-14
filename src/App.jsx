import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Acceuil from "./Pages/Acceuil.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Sinscrire from "./Pages/Sinscrire.jsx";
import DashboardSuperviseur from "./Pages/DashboardSuperviseur.jsx";
import DashboardElector from "./Pages/DashboardElector.jsx";
import CreerVotePage from "./Pages/CreerVotePage.jsx";
import GestionCandidatures from "./Pages/GestionCandidatures.jsx";
import AdministrationÉlections from "./Pages/AdministrationÉlections.jsx";
import AccueilElecteur from "./Pages/AccueilElecteur.jsx";
import MesCandidatures from "./Pages/MesCandidatures.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black bg-white p-0 m-0 w-full">
        <main className=" m-0 flex-1 ">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />

            <Route path="/supervision" element={<DashboardSuperviseur />}>
              <Route index element={<CreerVotePage />}></Route>
              <Route
                path="candidatures/"
                element={<GestionCandidatures />}
              ></Route>
              <Route
                path="electeurs/"
                element={<div>Gestion des electeurs</div>}
              ></Route>
              <Route
                path="elections/"
                element={<AdministrationÉlections />}
              ></Route>
            </Route>
            <Route path="/electeur" element={<DashboardElector />}>
              <Route
                index
                element={<AccueilElecteur/>}
              ></Route>
              <Route
                path="candidatures/"
                element={<MesCandidatures />}
              ></Route>
              <Route
                path="elections/"
                element={<div>Elections Actuelles</div>}
              ></Route>
              <Route
                path="profile/"
                element={<div>Reglages de mon profile</div>}
              ></Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
