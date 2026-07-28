import React from 'react'
import ElectionCard from '../Components/ElectionCard'
import { useEffect } from 'react'
import { useState } from 'react'
import { httpAxiosClient } from '../client/httpClient'
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../store/electionSlice.js";
import {fetchUserCandidatures} from "../store/userSlice.js";
import {Link} from "react-router-dom";
import { Info, CheckCircle2, CalendarDays } from "lucide-react";

export default function MesCandidatures() {
    const {elections, loading, error} = useSelector(state => state.elections)
    const {userCandidatures} = useSelector(state => state.elections)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchElections()).unwrap()
            .catch((error) => {
                console.error("Error fetching candidatures data:", error);
            });
        dispatch(fetchUserCandidatures()).unwrap()
    }, [])

    return (
        <div className='min-h-screen bg-slate-50'>
            <div className='max-w-6xl mx-auto px-6 py-10'>

                {/* En-tête */}
                <div className='mb-8'>
                    <p className='text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-2'>
                        Espace électeur
                    </p>
                    <h1 className='text-3xl font-bold text-slate-900'>Mes Candidatures</h1>
                    <p className='text-slate-500 mt-1'>Suivez vos candidatures et découvrez les élections ouvertes.</p>
                </div>

                {/* Bandeau d'information */}
                <div className='relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-5 mb-10 flex items-center gap-4 shadow-sm'>
                    <div className='absolute -right-6 -top-6 w-28 h-28 rounded-full bg-indigo-500/40'></div>
                    <div className='absolute -right-2 bottom-[-30px] w-20 h-20 rounded-full bg-indigo-400/30'></div>
                    <div className='shrink-0 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white relative z-10'>
                        <Info className='w-5 h-5' strokeWidth={2}/>
                    </div>
                    <p className='text-white/95 text-sm md:text-base relative z-10'>
                        Découvrez facilement les élections ouvertes et posez votre candidature en quelques clics.
                    </p>
                </div>

                {/* Candidatures déposées */}
                <section className='mb-12'>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-lg font-semibold text-slate-900'>Candidatures déposées</h2>
                        {userCandidatures && userCandidatures.length > 0 && (
                            <span className='text-xs font-medium text-slate-500 bg-slate-200 rounded-full px-2.5 py-1'>
                {userCandidatures.length}
              </span>
                        )}
                    </div>

                    {userCandidatures && userCandidatures.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {userCandidatures.map((cand, index) => (
                                <Link
                                    to={`${index}`}
                                    key={index}
                                    className='block transition-transform duration-200 hover:-translate-y-1'
                                >
                                    <ElectionCard election={cand} key={index}/>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
                            <div className='mx-auto mb-3 w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center'>
                                <CheckCircle2 className='w-5 h-5 text-slate-400' strokeWidth={2}/>
                            </div>
                            <p className='text-slate-500 text-sm'>Aucune candidature déposée pour le moment.</p>
                        </div>
                    )}
                </section>

                {/* Élections ouvertes */}
                <section>
                    <div className='flex items-center justify-between mb-5'>
                        <h2 className='text-lg font-semibold text-slate-900'>Élections actuellement ouvertes</h2>
                        {elections && elections.length > 0 && (
                            <span className='text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full px-2.5 py-1'>
                {elections.length} ouverte{elections.length > 1 ? 's' : ''}
              </span>
                        )}
                    </div>

                    {elections && elections.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-$ gap-4'>
                            {elections.map((cand, index) => (
                                <Link
                                    to={`../elections/${index}/take`}
                                    key={index}
                                    className='block transition-transform duration-200 hover:-translate-y-1'
                                >
                                    <ElectionCard election={cand} key={index}/>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center'>
                            <div className='mx-auto mb-3 w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center'>
                                <CalendarDays className='w-5 h-5 text-slate-400' strokeWidth={2}/>
                            </div>
                            <p className='text-slate-500 text-sm'>Aucune élection n'est en cours pour le moment.</p>
                        </div>
                    )}
                </section>

            </div>
        </div>
    )
}