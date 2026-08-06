import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { httpAxiosClient } from '../client/httpClient'
import { FormatDate } from '../utils/formatDate'
import { getCandidatureStatus } from '../utils/candidatureStatus'
import Card from '../Components/ui/Card.jsx'
import Badge from '../Components/ui/Badge.jsx'
import { fetchElections } from '../store/electionSlice.js'
import { fetchUserCandidatures } from '../store/userSlice.js'
import { Timer, Mail, CheckCircle2, CalendarDays, Award } from 'lucide-react'

export default function AccueilElecteur() {
    const dispatch = useDispatch()
    const { user, userCandidatures } = useSelector((state) => state.user)
    const { elections } = useSelector((state) => state.elections)
    const [electorStats, setElectorStats] = useState(null)

    useEffect(() => {
        dispatch(fetchElections())
        dispatch(fetchUserCandidatures())
        httpAxiosClient
            .get('/electeur/stats/')
            .then((res) => {
                if (res.data?.succes) setElectorStats(res.data.data)
            })
            .catch((error) => console.error('Error fetching elector stats:', error))
    }, [])

    const prochainesElections = elections.filter((e) => new Date(e.begin_date) >= new Date()).slice(0, 3)
    const electionsTerminees = elections.filter((e) => new Date(e.end_date) < new Date()).slice(0, 3)

    const electionName = (candidature) => {
        const election = elections.find((e) => String(e.id) === String(candidature.election))
        return election?.name ?? `Élection #${candidature.election}`
    }

    return (
        <div className='space-y-8 w-full'>
            {/* Bandeau de bienvenue */}
            <section className='relative overflow-hidden rounded-2xl bg-indigo-50 px-6 py-8 flex items-center gap-4'>
                <div className='shrink-0 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold'>
                    {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                </div>

                <div>
                    <h1 className='text-2xl font-bold text-slate-900'>
                        Bonjour, {user?.first_name} {user?.last_name} !
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
                        <p className='font-bold text-2xl text-slate-900 mt-2'>{electorStats?.activeElections ?? '—'}</p>
                        <Timer className='w-6 h-6 text-indigo-600 absolute top-6 right-5' strokeWidth={2}/>
                    </Card>

                    <Card className='px-5 py-6 relative'>
                        <p className='text-sm text-slate-500'>Candidatures en attente</p>
                        <p className='font-bold text-2xl text-slate-900 mt-2'>{electorStats?.pendingCandidatures ?? '—'}</p>
                        <Mail className='w-6 h-6 text-indigo-600 absolute top-6 right-5' strokeWidth={2}/>
                    </Card>

                    <Card className='px-5 py-6 relative'>
                        <p className='text-sm text-slate-500'>Élections participées</p>
                        <p className='font-bold text-2xl text-slate-900 mt-2'>{electorStats?.participatedElections ?? '—'}</p>
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

                {userCandidatures && userCandidatures.length > 0 ? (
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
                                {userCandidatures.map((candidature, index) => {
                                    const { label, variant } = getCandidatureStatus(candidature)
                                    return (
                                        <tr key={index} className='border-t border-slate-100'>
                                            <td className='py-3 px-4 text-slate-700'>{electionName(candidature)}</td>
                                            <td className='py-3 px-4'>
                                                <Badge variant={variant}>{label}</Badge>
                                            </td>
                                            <td className='py-3 px-4 text-slate-500'>{FormatDate.fromIsoToString(candidature.date_candidature)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Card>
                ) : (
                    <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
                        <p className='text-slate-500 text-sm'>Aucune candidature déposée pour le moment.</p>
                    </div>
                )}
            </section>

            {/* RESULTATAS RECENTS  */}
            <section>
                <h2 className='text-lg font-semibold text-slate-900 mb-4'>Résultats récents</h2>

                {electionsTerminees.length > 0 ? (
                    <ul className='flex flex-col gap-3'>
                        {electionsTerminees.map((election, index) => (
                            <li key={index} className='bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm p-4 flex items-center gap-3'>
                                <div className='shrink-0 w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center'>
                                    <CheckCircle2 className='w-4 h-4 text-emerald-700' strokeWidth={2}/>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-slate-900 mb-1'>{election.name}</p>
                                    <p className='text-sm text-slate-500'>{"Conclue le " + FormatDate.fromIsoToString(election.end_date)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
                        <p className='text-slate-500 text-sm'>Aucun résultat disponible pour le moment.</p>
                    </div>
                )}
            </section>

        </div>
    )
}
