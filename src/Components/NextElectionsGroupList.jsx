import React from 'react';
import {FormatDate} from "../utils/formatDate.js";
import {Link} from "react-router-dom";
import SubtitleLine from "./SubtitleLine.jsx";

function NextElectionsGroupList({
    title,
    items,
    actionTitle
}) {
    return (
        <div className="py-5">
            <SubtitleLine title={title} actionRoute="elections" actionTitle={actionTitle} />
            <ul className="flex flex-col justify-around gap-y-4">
                {items && items.length > 0 &&
                    items.map((item, index) => (
                        <li key={index} className='bg-gray-100 p-3 ml-2 flex items-center gap-3 rounded-sm'>
                            <img src="img/success_ico.png" alt="timer icon" className='w-7 h-6'/>
                            <div className="text-content">
                                <p className='font-semibold'>{item.name}</p>
                                <p className="text-gray-700">{"Du " + FormatDate.fromIsoToString(item.begin_date) + " au " + FormatDate.fromIsoToString(item.end_date)}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default NextElectionsGroupList;