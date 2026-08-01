import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { httpAxiosClient } from '../client/httpClient'
import { FormatDate } from '../utils/formatDate'
import Card from '../Components/ui/Card.jsx'
import { Timer, Mail, CheckCircle2, CalendarDays, Award } from 'lucide-react'

const STATUS_STYLES = {
    "En attente": "bg-amber-100 text-amber-700",
    "Approuvée": "bg-emerald-100 text-emerald-700",
    "Rejetée": "bg-red-100 text-red-600",
    "Validé": "bg-emerald-100 text-emerald-700",
}

export default function AccueilElecteur() {
    const [prochainesElections, setProchainesElections] = useState([])
    const prochaines_elections = [
        {
            "name": "Election du Conseil d'Administration 2024",
            "begin_date" : "15 juillet 2024",
            "end_date": "20 juillet 2024"

        },
        {
            "name": "Vote pour la Nouvelle Politique de Télétravail",
            "begin_date" : "01 août 2024",
            "end_date": "05 août 2024"

        },
        {
            "name": "Election du Comité d'Entreprise",
            "begin_date" : "10 septembre 2024",
            "end_date": "12 septembre 2024"

        },
    ]

    const candidatures = [
        {
            "election": "Election du Conseil d'Administration 2025",
            "status": "En attente",
            "date": "01 juillet 2025",
        },
        {
            "election": "Vote pour la Nouvelle Politique de Télétravail",
            "status": "Approuvée",
            "date" : "01 août 2025",
        },
        {
            "election": "Election de responsable",
            "status": "Rejetée",
            "date": "01 juillet 2025",
        },
    ]

    const resultats = [
        {
            "name": "Vote pour la Président du Syncicat",
            "date" : "01 septembre 2025",
            "status": "Validé"
        },

        {
            "name": "Vote pour la Président du Syncicat",
            "date" : "01 septembre 2025",
            "status": "Validé"
        },
    ]

    useEffect(() => {
        //const user = JSON.parse(localStorage.getItem("vote_user"));
        // if (!user) {
          // const access = localStorage.getItem("access_token");
          // console.log(`Bearer ${access}`)
          httpAxiosClient
            .get("/elections/",)
            .then((data) => {
              // console.log("User data fetched successfully:", data.data);
              if(data.data.succes){
                setProchainesElections(data.data.data)
              }
    
              // if(data.data.success){
              //   localStorage.setItem("vote_user", JSON.stringify(data.data.data));
              // } else{
              //   navigate('/Connexion')
              // }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        // }
      }, []);

    return (
        <div className='space-y-8 w-full'>
            {/* Bandeau de bienvenue */}
            <section className='relative overflow-hidden rounded-2xl bg-indigo-50 px-6 py-8 flex items-center gap-4'>
                <div className='shrink-0 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold'>
                    JD
                </div>

                <div>
                    <h1 className='text-2xl font-bold text-slate-900'>
                        Bonjour, Jean Doe !
                    </h1>

                    <p className='text-slate-500 mt-1'>
                        Bienvenue sur votre tableau de bord Super Vote.
                        Gérez vos candidatures, suivez les élections en cours et consultez
                        les résultats récents.
                    </p>
                </div>
            </section>

            {/* Statistiques phares */}
            <section>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>
                    Statistiques phares
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <Card className='px-5 py-6 relative'>
                        <p className='text-sm text-slate-500'>Élections actives</p>
                        <p className='font-bold text-2xl text-slate-900 mt-2'>3</p>
                        <Timer className='w-6 h-6 text-indigo-600 absolute top-6 right-5' strokeWidth={2}/>
                    </Card>

                    <Card className='px-5 py-6 relative'>
                        <p className='text-sm text-slate-500'>Candidatures en attente</p>
                        <p className='font-bold text-2xl text-slate-900 mt-2'>2</p>
                        <Mail className='w-6 h-6 text-indigo-600 absolute top-6 right-5' strokeWidth={2}/>
                    </Card>

                    <Card className='px-5 py-6 relative'>
                        <p className='text-sm text-slate-500'>Élections participées</p>
                        <p className='font-bold text-2xl text-slate-900 mt-2'>8</p>
                        <Award className='w-6 h-6 text-indigo-600 absolute top-6 right-5' strokeWidth={2}/>
                    </Card>
                </div>
            </section>

            {/* PROCHAINES ELECTIONS */}
            <section>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>
                    Prochaines élections
                </h2>

                {prochainesElections.length > 0 ? (
                    <ul className='flex flex-col gap-3'>
                        {prochainesElections.map((election, index) => (
                            <li key={index} className='bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-4 flex items-center gap-3'>
                                <div className='shrink-0 w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center'>
                                    <CalendarDays className='w-4 h-4 text-indigo-600' strokeWidth={2}/>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-slate-900 mb-1'>{election.name}</p>
                                    <p className='text-sm text-slate-500'>
                                        {"Du " + FormatDate.fromIsoToString(election.begin_date) + " au " + FormatDate.fromIsoToString(election.end_date)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
                        <div className='mx-auto mb-3 w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center'>
                            <CalendarDays className='w-5 h-5 text-slate-400' strokeWidth={2}/>
                        </div>
                        <p className='text-slate-500 text-sm'>Aucune élection à venir pour le moment.</p>
                    </div>
                )}
            </section>

            {/* MES CANDIDATURES */}
            <section>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>Mes candidatures</h2>

                <Card className='overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead className='bg-slate-50 text-slate-500'>
                            <tr>
                                <th className='py-3 text-left px-4 font-medium'>Élection</th>
                                <th className='text-left px-4 font-medium'>Statut</th>
                                <th className='text-left px-4 font-medium'>Date de soumission</th>
                            </tr>
                        </thead>

                        <tbody>
                            {candidatures.map((candidature, index) => (
                                <tr key={index} className='border-t border-slate-100'>
                                    <td className='py-3 px-4 text-slate-700'>{candidature.election}</td>
                                    <td className='py-3 px-4'>
                                        <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${STATUS_STYLES[candidature.status] ?? "bg-slate-100 text-slate-500"}`}>
                                            {candidature.status}
                                        </span>
                                    </td>
                                    <td className='py-3 px-4 text-slate-500'>{candidature.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </section>

            {/* RESULTATAS RECENTS  */}
            <section>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>Résultats récents</h2>

                <ul className='flex flex-col gap-3'>
                    {resultats.map((res, index) => (
                        <li key={index} className='bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-4 flex items-center gap-3'>
                            <div className='shrink-0 w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center'>
                                <CheckCircle2 className='w-4 h-4 text-emerald-700' strokeWidth={2}/>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-slate-900 mb-1'>{res.name}</p>
                                <p className='text-sm text-slate-500'>{"Conclut le " + res.date + " - " + res.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    )
}
