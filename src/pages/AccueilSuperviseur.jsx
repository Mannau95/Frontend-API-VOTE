import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StatisticCardList from "../Components/StatisticCardList.jsx";
import NextElectionsGroupList from "../Components/NextElectionsGroupList.jsx";
import {httpAxiosClient} from "../client/httpClient.js";
import SubtitleLine from "../Components/SubtitleLine.jsx";
import CustomTable from "../Components/table/CustomTable.jsx";
import VoteGroupList from "../Components/VoteGroupList.jsx";
import {fetchElections} from "../store/electionSlice.js";
import {fetchElectors} from "../store/userSlice.js";
import {fetchCandidatures} from "../store/candidatureSlice.js";
import {FormatDate} from "../utils/formatDate.js";

function AccueilSuperviseur() {
    const {user} = useSelector((state) => state.user);
    const {elections} = useSelector((state) => state.elections);
    const {electors} = useSelector((state) => state.user);
    const {candidatures} = useSelector((state) => state.candidatures);
    const dispatch = useDispatch();

    const [orgStats, setOrgStats] = useState(null);

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchElectors());
        dispatch(fetchCandidatures());
        httpAxiosClient
            .get("/organisations/me/stats/")
            .then((res) => {
                if (res.data?.succes) setOrgStats(res.data.data);
            })
            .catch((error) => console.error("Error fetching organisation stats:", error));
    }, []);

    const stats = [
        {
            title: "Elections Actuelles",
            value: orgStats?.activeElections ?? "—",
            description: "Élections en cours dans votre organisation",
        },
        {
            title: "Candidatures En Attente",
            value: orgStats?.pendingCandidatures ?? "—",
            description: "En attente de votre validation",
        },
        {
            title: "Candidats Actifs",
            value: orgStats?.activeCandidates ?? "—",
            description: "Candidatures approuvées",
        },
    ]

    const candidateName = (candidature) => {
        const candidate = electors.find((u) => u.id === candidature.candidate);
        return candidate ? `${candidate.first_name} ${candidate.last_name}`.trim() : `Candidat #${candidature.candidate}`;
    };

    const electionName = (candidature) => {
        const election = elections.find((e) => String(e.id) === String(candidature.election));
        return election?.name ?? `Élection #${candidature.election}`;
    };

    const candidaturesColumns = [
        {
            title: "Candidat",
            code: "candidate",
            render: (row) => candidateName(row),
        },
        {
            title: "Elections",
            code: "election",
            render: (row) => electionName(row),
        },
        {
            title: "Statut",
            code: "status",
        },
        {
            title: "Date de soumission",
            code: "date_candidature",
            render: (row) => FormatDate.fromIsoToString(row.date_candidature),
        },
    ]

    const candidaturesEnAttente = candidatures.filter((c) => c.status === "en_attente");

    return (
        <div className="space-y-6 w-full">
            <section>
                <div className="flex items-center gap-x-4 w-full bg-indigo-50 p-4 rounded-lg">
                    {/*Image*/}
                    <div className="w-25 rounded-full avatar">
                        <img
                            alt="Profil image" className='w-20 rounded-full'
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
                    <div className="w-full">
                        <h2>Bonjour, {user?.first_name} {user?.last_name}</h2>
                        <p className="text-lg text-gray-600">
                            Bienvenue sur votre tableau de bord Super Vote. <br />
                            Gérez vos candidatures, suivez les élections en cours et consultez les résultats récents.
                        </p>
                    </div>
                </div>

                <StatisticCardList title="Statistiques clés" items={stats} />
            </section>
            <section>
                <div className="shadow-sm rounded-lg px-5">
                    <NextElectionsGroupList title="Prochaines Elections" items={elections.slice(0,3)}
                        actionTitle="Voir tout" actionRoute="elections" />
                </div>
            </section>

            <section>
                <div className="shadow-sm rounded-lg px-5">
                    <SubtitleLine title="Candidatures en attente" actionTitle="Gérer les candidatures" actionRoute="candidats" />
                    <CustomTable columns={candidaturesColumns} rows={candidaturesEnAttente} />
                </div>
            </section>

            <section>
                <div className="shadow-sm rounded-lg px-5">
                    <VoteGroupList title="Résultats récents" items={elections.filter((e) => new Date(e.end_date) < new Date()).slice(0,3)}
                        actionTitle="Voir tous les résultats" actionRoute="elections" />
                </div>
            </section>
        </div>
    );
}

export default AccueilSuperviseur;
