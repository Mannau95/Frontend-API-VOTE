import React from 'react'
import ElectionCard from '../Components/ElectionCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { httpAxiosClient } from '../client/httpClient';

export default function ElectionsActuellesElecteur() {
  const navigate = useNavigate();
    const [ isActive, setIsActive ] = useState(0)
    const [elections, setElections] = useState([])

      useEffect(() => {
          httpAxiosClient
            .get("/elections/",)
            .then((data) => {
              console.log("User data fetched successfully:", data.data);
              if(data.data?.succes){
                setElections(data.data.data)
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        // }
      }, []);

    return (
        <div className='px-6 bg-gray-100'>
            <h1 className='text-2xl font-semibold mb-6'>Les Elections Actuelles</h1>

            {/* ENTETE  */}
            <div className="flex p-[.4rem] bg-gray-200 rounded-md">
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 0 ? "active": ''}`} onClick={()=> { setIsActive(0) }}>Actives</p>
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 1 ? "active": ''}`} onClick={()=> { setIsActive(1) }}>A venir</p>
                <p className={`flex-1/3 text-center entete rounded-md py-2.5 cursor-pointer ${isActive === 2 ? "active": ''}`} onClick={()=> { setIsActive(2) }}>Terminées</p>
            </div>

            <div className='grid grid-cols-5 gap-3 my-4'>
                {
                    elections.map((cand, index) =>{
                    return (
                        <ElectionCard election={cand} key={index} btnTitle='Voter'/>
                    )
                    })
                }
            </div>
        </div>
    )
}
