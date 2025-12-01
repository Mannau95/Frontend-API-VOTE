import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Acceuil from "./Pages/Acceuil.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Sinscrire from "./Pages/Sinscrire.jsx";
import DashboardSuperviseur from "./Pages/DashboardSuperviseur.jsx";
import DashboardElector from "./Pages/DashboardElector.jsx";
import CreerVotePage from "./Pages/CreerVotePage.jsx";
import GestionCandidatures from "./Pages/GestionCandidatures.jsx";
import AdminElectionPage from "./Pages/AdministrationElections.jsx";
import AccueilElecteur from "./Pages/AccueilElecteur.jsx";
import MesCandidatures from "./Pages/MesCandidatures.jsx";
import ElectionsActuellesElecteur from "./Pages/ElectionsActuellesElecteur.jsx";
// import Ges from "./Pages/GestionElecteurs.jsx'
import GestionElecteurs from "./Pages/GestionElecteurs.jsx";
import StartSetPassword from "./Pages/StartSetPassword.jsx";
import SetPassword from "./Pages/SetPassword.jsx";
import NotFound from "./Pages/NotFound.jsx";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black bg-gray-50 p-0 m-0 w-full">
        <main className=" m-0 flex-1 ">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />
            {/*<Route path="/MotDePasse" element={<MotDePasse />} />*/}
            <Route path="/startSetPassword" element={<StartSetPassword />} />
            <Route path="/setPassword/:token" element={<SetPassword />} />

            <Route path="/supervision" element={<DashboardSuperviseur />}>
              <Route index element={<CreerVotePage />} />

              <Route path="candidats/" element={<GestionCandidatures />}/>

              <Route path="electeurs/" element={<GestionElecteurs />} />
              <Route path="elections/" element={<AdminElectionPage />}/>
            </Route>
            <Route path="/electeur" element={<DashboardElector />}>
              <Route index element={<AccueilElecteur />} />
              <Route path="candidatures/" element={<MesCandidatures />} />
              <Route path="elections/" element={<ElectionsActuellesElecteur />} />
              <Route path="profile/" element={<div>Reglages de mon profile</div>} />
              <Route index element={<AccueilElecteur />} />
            </Route>
            <Route path="/*" element={< NotFound/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
