import React from 'react'
import ElectionCard from '../Components/ElectionCard'
import { useEffect } from 'react'
import { useState } from 'react'
import { httpAxiosClient } from '../client/httpClient'
import {useDispatch, useSelector} from "react-redux";
import {fetchElections} from "../store/electionSlice.js";
import {fetchUserCandidatures} from "../store/userSlice.js";
import {Link} from "react-router-dom";

export default function MesCandidatures() {
    // const [electionsCandidatures, setElectionsCandidatures] = useState([])
    const {elections, loading, error} = useSelector(state => state.elections)
    const {userCandidatures} = useSelector(state => state.elections)
    const dispatch = useDispatch()
  // const electionsCandidatures = [
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  //   {
  //     "image": "a",
  //     "title": "Election du Conseil Electoral 2025",
  //     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
  //     "begin_date": "03 octobre 2025",
  //   },
  // ]

  useEffect(()=>{
    // const connectedUserId = user.id
    dispatch(fetchElections()).unwrap()
      .catch((error) => {
        console.error("Error fetching candidatures data:", error);
      });
    dispatch(fetchUserCandidatures()).unwrap()
  }, [])

  return (
    <div className='px-6 bg-gray-50'>
      <h1 className='text-2xl font-semibold mb-6'>Mes Candidatures</h1>

      <div id="infos" className='bg-blue-100 my-3 p-5 flex justify-between rounded-lg'>
        <p>Découvrez facilement les élections ouvertes et poser votre candidature facilement. </p>
      </div>

      <section>
        <h2 className='text-xl font-semibold mb-4'>Candidatures Déposées</h2>

        <div className='grid-5  gap-y-3'>
            {
                userCandidatures ?
                userCandidatures.map((cand, index) =>{
                    return (
                        <Link to={`${index}`} key={index}>
                            <ElectionCard election={cand} key={index}/>
                        </Link>
                    )
                }):
                <p>Aucune candidature déposée pour le moment.</p>
            }
        </div>

      </section>

      <section>
        <h2 className='text-xl font-semibold mb-4'>Elections Actuelles ouvertes</h2>

        <div className='grid grid-cols-5 gap-3'>
          {
            elections ?
            elections.map((cand, index) =>{
              return (
                <Link to={`../elections/${index}/take`} key={index}>
                    <ElectionCard election={cand} key={index}/>
                </Link>
              )
            }):
              <p>Aucune élection n'est en cours pour le moment.</p>
          }
        </div>

      </section>
    </div>
  )
}
