import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import StatisticCardList from "../Components/StatisticCardList.jsx";
import NextElectionsGroupList from "../Components/NextElectionsGroupList.jsx";
import {httpAxiosClient} from "../client/httpClient.js";
import SubtitleLine from "../Components/SubtitleLine.jsx";
import CustomTable from "../Components/CustomTable.jsx";
import VoteGroupList from "../Components/VoteGroupList.jsx";

function AccueilSuperviseur() {
    const {user} = useSelector((state) => state.user);

    const stats = [
        {
            title: "Elections Actuelles",
            value: 20,
            description: "A description of Supervise",
        },
        {
            title: "Candidatures En Attente",
            value: 2,
            description: "A description of Supervise",
        },
        {
            title: "Candidats Actifs",
            value: 300,
            description: "A description of Supervise",
        },
    ]

    const [prochainesElections, setProchainesElections] = useState([])

    const candidaturesColumns = [
        {
            title: "Elections",
            code: "election_title",
        },
        {
            title: "Statut",
            code: "status",
        },
        {
            title: "Date de soumission",
            code: "date_candidature",
        },
    ]
    const candidatures = [
        {
            "election_title": "Election du Conseil Administratif 2026",
            "date_candidature": "2026-05-02",
            "status": "En attente",
        },
        {
            "election_title": "Vote de la Nouvelle Politique de Télétravail",
            "date_candidature": "2026-05-20",
            "status": "Approuvée",
        },
        {
            "election_title": "Mise à jour des statuts de l'Association",
            "date_candidature": "2026-02-20",
            "status": "Approuvée",
        },
    ]

    useEffect(() => {
        httpAxiosClient
            .get("/elections/",)
            .then((data) => {
                // console.log("User data fetched successfully:", data.data);
                if(data.data.succes){
                    setProchainesElections(data.data.data)
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        // }
    }, []);

    return (
        <div className="space-y-6 w-full">
            <section>
                <div className="flex items-center gap-x-4 w-full bg-blue-50 p-4 rounded-lg">
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
                    <NextElectionsGroupList title="Prochaines Elections" items={prochainesElections.slice(0,3)}
                        actionTitle="Voir tout" actionRoute="elections" />
                </div>
            </section>

            <section>
                <div className="shadow-sm rounded-lg px-5">
                    <SubtitleLine title="Candidatures en attente" actionTitle="Gérer les candidatures" actionRoute="candidats" />
                    <CustomTable columns={candidaturesColumns} rows={candidatures} />
                </div>
            </section>

            <section>
                <div className="shadow-sm rounded-lg px-5">
                    <VoteGroupList title="Résultats récents" items={prochainesElections.slice(0,3)}
                        actionTitle="Voir tous les résultats" actionRoute="elections" />
                </div>
            </section>
        </div>
    );
}

export default AccueilSuperviseur;