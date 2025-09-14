import React from 'react'
import ElectionCard from '../Components/ElectionCard';
import { useState } from 'react';

export default function ElectionsActuellesElecteur() {
    const [ isActive, setIsActive ] = useState(0)
    const elections = [
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
        {
          "image": "a",
          "title": "Election du Conseil Electoral 2025",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
          "begin_date": "03 octobre 2025",
        },
      ]

    return (
        <div className='px-6 bg-gray-100'>
            <h1 className='text-2xl font-semibold mb-6'>Les Elections Actuelles</h1>

            {/* ENTETE  */}
            <div className="flex p-[.4rem] bg-gray-200 rounded-md">
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 0 ? " active ": ' '}`} onClick={()=> { setIsActive(0) }}>Actives </p>
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 1 ? " active ": ' '}`} onClick={()=> { setIsActive(1) }}>A venir</p>
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 2 ? " active ": ' '}`} onClick={()=> { setIsActive(2) }}>Terminées</p>
            </div>

            <div className='flex flex-wrap justify-items-start items-center gap-[1%] gap-y-6 my-4'>
                {
                    elections.map((cand, index) =>{
                    return (
                        <ElectionCard election={cand} key={index}/>
                    )
                    })
                }
            </div>
        </div>
    )
}
