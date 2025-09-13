import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Acceuil from "./Pages/Acceuil.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Sinscrire from "./Pages/Sinscrire.jsx";
import DashboardSuperviseur from "./Pages/DashboardSuperviseur.jsx";
import DashboardElector from "./Pages/DashboardElector.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black bg-white p-0 m-0 w-full">
        <main className=" m-0 flex-1 ">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/electeur" element={<DashboardElector />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />
            <Route path="/supervision" element={<DashboardSuperviseur />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
