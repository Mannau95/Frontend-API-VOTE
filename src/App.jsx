import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Footer from "./Components/Footer.jsx";
import Acceuil from "./pages/Acceuil.jsx";
import Connexion from "./pages/Connexion.jsx";
import Sinscrire from "./pages/Sinscrire.jsx";
import DashboardSuperviseur from "./pages/DashboardSuperviseur.jsx";
import DashboardElector from "./pages/DashboardElector.jsx";
import CreerVotePage from "./pages/CreerVotePage.jsx";
import GestionCandidatures from "./pages/GestionCandidatures/GestionCandidatures.jsx";
import AdminElectionPage from "./pages/AdministrationElection/AdministrationElections.jsx";
import AccueilElecteur from "./pages/AccueilElecteur.jsx";
import MesCandidatures from "./pages/MesCandidatures.jsx";
import ElectionsActuellesElecteur from "./pages/ElectionsActuellesElecteur.jsx";
// import Ges from "./Pages/GestionElecteurs.jsx'
import GestionElecteurs from "./pages/gestion_electeur/GestionElecteurs.jsx";
import StartSetPassword from "./pages/StartSetPassword.jsx";
import SetPassword from "./pages/SetPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import CandidatureDetail from "./pages/GestionCandidatures/CandidatureDetail.jsx";
import ElecteurTakeCandidature from "./pages/ElecteurTakeCandidature.jsx";
import AccueilSuperviseur from "./pages/AccueilSuperviseur.jsx";
import DetailsVoteAdmin from "./pages/AdministrationElection/DetailsVoteAdmin.jsx";
import ElectionDetailPage from "./pages/election/ElectionDetailPage.jsx";
import VotePage from "./pages/vote/VotePage.jsx";
import ModifyElectionPage from "./pages/election/ModifyElectionPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AbonnementPage from "./pages/AbonnementPage.jsx";
import OrganisationPage from "./pages/OrganisationPage.jsx";
import PaiementPage from "./pages/PaiementPage.jsx";
import EquipePage from "./pages/EquipePage.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black bg-gray-50 p-0 m-0 w-full">
        <main className=" m-0 flex-1 ">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />
            <Route path="/abonnement" element={<ProtectedRoute role="is_supervisor"><AbonnementPage /></ProtectedRoute>} />
            <Route path="/paiement" element={<ProtectedRoute role="is_supervisor"><PaiementPage /></ProtectedRoute>} />
            <Route path="/organisation" element={<ProtectedRoute role="is_supervisor"><OrganisationPage /></ProtectedRoute>} />
            <Route path="/organisation/equipe" element={<ProtectedRoute role="is_supervisor"><EquipePage /></ProtectedRoute>} />
            {/*<Route path="/MotDePasse" element={<MotDePasse />} />*/}
            <Route path="/startSetPassword" element={<StartSetPassword />} />
            <Route path="/setPassword/:token" element={<SetPassword />} />

            <Route path="/supervision" element={<ProtectedRoute role="is_supervisor"><DashboardSuperviseur /></ProtectedRoute>}>
              <Route index element={<AccueilSuperviseur />} />

              <Route path="candidats/" element={<GestionCandidatures />}/>
              <Route path="candidats/:candidatureId" element={<CandidatureDetail />}/>

              <Route path="electeurs/" element={<GestionElecteurs />} />
              <Route path="elections/" element={<AdminElectionPage />}/>
              <Route path="elections/:id/details" element={<DetailsVoteAdmin />}/>
              <Route path="elections/:id/edit" element={<ModifyElectionPage />} />
            </Route>
            <Route path="/electeur" element={<ProtectedRoute role="is_elector"><DashboardElector /></ProtectedRoute>}>
              <Route index element={<AccueilElecteur />} />
              <Route path="candidatures/" element={<MesCandidatures />} />
              <Route path="candidatures/:candidatureId" element={<CandidatureDetail />} />
              <Route path="elections/" element={<ElectionsActuellesElecteur />} />
              <Route path="elections/:electionId/take" element={<ElectionDetailPage />} />
              <Route path="elections/:electionId/voter" element={<VotePage />} />
              <Route path="profile/" element={<ProfilePage />} />
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
