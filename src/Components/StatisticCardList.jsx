import React from 'react';

function StatisticCardList({
    title,
    items,
}) {
    return (
        <div>
            <h3>{title}</h3>

            <div className="flex justify-between items-start ">
                {
                    items && items.length > 0 &&
                    items.map((item, index) => (
                        <div key={index} className='flex flex-col w-[31%] px-5 py-6 shadow-xs shadow-gray-300 relative'>
                            <p>{item?.title}</p>
                            <p className='font-bold text-2xl mt-2'>{item?.value}</p>
                            <p>{item?.description}</p>
                            <img src="img/timer_ico.png" alt="timer icon" className='w-7 h-6 absolute top-10 right-6'/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default StatisticCardList;