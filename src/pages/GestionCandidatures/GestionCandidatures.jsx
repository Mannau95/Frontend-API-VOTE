import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import CandidatureCard from "../../Components/CandidatureCard.jsx";
import CandidaturesFilterBar from "./CandidaturesFilterBar.jsx";
import { fetchElections } from "../../store/electionSlice.js";
import { fetchElectors } from "../../store/userSlice.js";
import { fetchCandidatures } from "../../store/candidatureSlice.js";

function GestionCandidatures() {
    const dispatch = useDispatch();
    const { elections } = useSelector((state) => state.elections);
    const { electors } = useSelector((state) => state.user);
    const { candidatures, loading } = useSelector((state) => state.candidatures);

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchElectors());
        dispatch(fetchCandidatures());
    }, []);

    const candidateName = (candidature) => {
        const user = electors.find((u) => u.id === candidature.candidate);
        return user ? `${user.first_name} ${user.last_name}`.trim() : `Candidat #${candidature.candidate}`;
    };

    return (
        <div className="p-6 flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6">Gestion des Candidatures</h1>

            <div className="gap-6 mb-8">
                <div className="px-6 py-4 bg-gray-50 min-h-[80dvh]">
                    <h1 className="text-2xl font-semibold mb-6">
                        Filtrer et gerer les candidatures
                    </h1>

                    <CandidaturesFilterBar />

                    <div className="mt-6">
                        {loading && (
                            <div className="flex w-full h-[70dvh]">
                                <p className="m-auto text-sm text-slate-500">Chargement des candidatures...</p>
                            </div>
                        )}

                        {!loading && candidatures.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
                                <div className="mx-auto mb-3 w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-slate-400" strokeWidth={2} />
                                </div>
                                <p className="text-slate-500 text-sm">Aucune candidature émise pour le moment.</p>
                            </div>
                        )}

                        {!loading && candidatures.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {candidatures.map((candidature) => (
                                    <Link
                                        to={`${candidature.id}`}
                                        key={candidature.id}
                                        className="block transition-transform duration-200 hover:-translate-y-1"
                                    >
                                        <CandidatureCard
                                            candidature={candidature}
                                            election={elections.find((e) => String(e.id) === String(candidature.election))}
                                            candidateName={candidateName(candidature)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionCandidatures;
