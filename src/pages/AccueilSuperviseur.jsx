import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticCardList from "../Components/StatisticCardList.jsx";
import NextElectionsGroupList from "../Components/NextElectionsGroupList.jsx";
import { httpAxiosClient } from "../client/httpClient.js";
import SubtitleLine from "../Components/SubtitleLine.jsx";
import CustomTable from "../Components/table/CustomTable.jsx";
import VoteGroupList from "../Components/VoteGroupList.jsx";
import { fetchElections } from "../store/electionSlice.js";
import { fetchElectors } from "../store/userSlice.js";
import { fetchCandidatures } from "../store/candidatureSlice.js";
import { FormatDate } from "../utils/formatDate.js";

function AccueilSuperviseur() {
    const {user, loading: userLoading, error: userError} = useSelector((state) => state.user);
    const {elections, loading: electionsLoading, error: electionsError} = useSelector((state) => state.elections);
    const {electors} = useSelector((state) => state.user);
    const {candidatures, loading: candidaturesLoading, error: candidaturesError} = useSelector((state) => state.candidatures);
    const dispatch = useDispatch();

    const [orgStats, setOrgStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(null);

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchElectors());
        dispatch(fetchCandidatures());
        httpAxiosClient
            .get("/organisations/me/stats/")
            .then((res) => {
                if (res.data?.succes) {
                    setOrgStats(res.data.data);
                } else {
                    setStatsError(res.data?.details || "Impossible de charger les statistiques.");
                }
            })
            .catch((error) => {
                console.error("Error fetching organisation stats:", error);
                setStatsError("Impossible de charger les statistiques pour le moment.");
            })
            .finally(() => setStatsLoading(false));
    }, [dispatch]);

    const stats = [
        {
            title: "Élections actives",
            value: orgStats?.activeElections ?? "—",
            description: "Élections en cours dans votre organisation",
        },
        {
            title: "Candidatures en attente",
            value: orgStats?.pendingCandidatures ?? "—",
            description: "En attente de votre validation",
        },
        {
            title: "Candidats actifs",
            value: orgStats?.activeCandidates ?? "—",
            description: "Candidatures approuvées",
        },
    ];

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
    const isLoading = userLoading || electionsLoading || candidaturesLoading || statsLoading;
    const hasError = Boolean(userError || electionsError || candidaturesError || statsError);

    return (
        <div className="space-y-6 w-full">
            <section>
                <div className="flex items-center gap-x-4 w-full bg-indigo-50 p-4 rounded-lg">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <span className="text-lg font-semibold">{(user?.first_name?.[0] || "U")}{(user?.last_name?.[0] || "")}</span>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold text-slate-900">Bonjour, {user?.first_name} {user?.last_name}</h2>
                        <p className="text-sm text-gray-600">
                            Bienvenue sur votre tableau de bord Super Vote. Gérez vos candidatures, suivez les élections en cours et consultez les résultats récents.
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
                        Chargement de votre tableau de bord…
                    </div>
                ) : hasError ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-600">
                        Impossible de charger certaines informations de votre tableau de bord.
                    </div>
                ) : (
                    <StatisticCardList title="Statistiques clés" items={stats} />
                )}
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
                    {isLoading ? (
                        <div className="rounded-lg border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
                            Chargement des candidatures…
                        </div>
                    ) : hasError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-600">
                            Impossible de charger les candidatures pour le moment.
                        </div>
                    ) : candidaturesEnAttente.length > 0 ? (
                        <CustomTable columns={candidaturesColumns} rows={candidaturesEnAttente} />
                    ) : (
                        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-8 text-center text-sm text-slate-500">
                            Aucune candidature en attente pour le moment.
                        </div>
                    )}
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
