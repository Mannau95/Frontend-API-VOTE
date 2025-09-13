import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Acceuil from "./Pages/Acceuil.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Participervote from "./Pages/ParticiperVote.jsx";
import Sinscrire from "./Pages/Sinscrire.jsx";
import CréerUnVote from "./Pages/CreerVote.jsx";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto flex-1 px-4 py-6">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Vote" element={<Participervote />} />
            <Route path="/Sinscrire" element={<Sinscrire />} />
            <Route path="/CréerUnVote" element={<CréerUnVote />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
