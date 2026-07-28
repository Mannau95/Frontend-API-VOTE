import React from "react";
import {FormatDate} from "../utils/formatDate";
import { Calendar, ArrowRight } from "lucide-react";

export default function ElectionCard({election, btnTitle = "Postuler", hasBtn = true, onClick = null}) {
    return (
        <div className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow duration-200 hover:shadow-md">
            <div className="relative">
                <img
                    src="/img/election_pict.png" //{election.image}
                    alt="groupe de personnes"
                    className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"/>
            </div>

            <div className="flex flex-col flex-1 px-5 py-4 text-left">
                <h3 className="font-semibold text-lg text-slate-900 leading-snug">
                    {election.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1.5 line-clamp-3">
                    {election.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2}/>
                    <span>Date limite :</span>
                    <span className="font-medium text-slate-700">
                        {FormatDate.fromIsoToString(election.begin_date)}
                    </span>
                </div>

                {hasBtn && (
                    <button
                        className="mt-4 inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-lg bg-indigo-600 text-white text-sm font-medium border-0 transition-colors duration-200 hover:bg-indigo-700"
                        onClick={() => { if (onClick) onClick() }}
                    >
                        {btnTitle}
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2}/>
                    </button>
                )}
            </div>
        </div>
    );
}