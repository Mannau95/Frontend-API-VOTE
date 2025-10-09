import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Acceuil from "./Pages/Acceuil.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Sinscrire from "./Pages/Sinscrire.jsx";
import DashboardSuperviseur from "./Pages/DashboardSuperviseur.jsx";
import DashboardElector from "./Pages/DashboardElector.jsx";
import CreerVotePage from "./Pages/CreerVotePage.jsx";
//import GestionCandidatures from "./Pages/GestionCandidatures.jsx";
import AdministrationÉlections from "./Pages/AdministrationÉlections.jsx";
import AccueilElecteur from "./Pages/AccueilElecteur.jsx";
import MesCandidatures from "./Pages/MesCandidatures.jsx";
import ElectionsActuellesElecteur from "./Pages/ElectionsActuellesElecteur.jsx";
// import Ges from "./Pages/GestionElecteurs.jsx'
import GestionElecteurs from "./Pages/GestionElecteurs.jsx";
import MotDePasse from "./Pages/motdepasse.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black bg-gray-50 p-0 m-0 w-full">
        <main className=" m-0 flex-1 ">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />
            <Route path="/MotDePasse" element={<ProtectedRoute> <MotDePasse /> </ProtectedRoute>} />

            <Route path="/supervision" element={<ProtectedRoute role='is_supervisor'> <DashboardSuperviseur /> </ProtectedRoute>}>
              <Route index element={<CreerVotePage />}></Route>

              {/* <Route path="candidatures/" element={<GestionCandidatures />}></Route> */}

              <Route path="electeurs/" element={<GestionElecteurs />}/>
              <Route path="elections/" element={<AdministrationÉlections />} />
            </Route>

            <Route path="/electeur" element={<ProtectedRoute> <DashboardElector /> </ProtectedRoute>}>
              <Route index element={<AccueilElecteur />} />
              <Route path="candidatures/" element={<MesCandidatures />} />
              <Route path="elections/" element={<ElectionsActuellesElecteur />} />
              <Route path="profile/" element={<div>Reglages de mon profile</div>} />
              {/* <Route index element={<AccueilElecteur />} />
              <Route path="candidatures/" element={<div>Mes candidatures</div>} />
              <Route path="elections/" element={<div>Elections Actuelles</div>} />
              <Route path="profile/" element={<div>Reglages de mon profile</div>} /> */}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
