import React from 'react'
import ElectionCard from '../Components/ElectionCard'

export default function MesCandidatures() {
  const electionsCandidatures = [
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
    {
      "image": "",
      "title": "Election du Conseil Electoral 2025",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat rem nisi id velit explicabo error, deserunt fuga obcaecati adipisci sed esse totam, debitis quaerat iste  ",
      "begin_date": "03 octobre 2025",
    },
  ]
  return (
    <div className='px-6 bg-gray-50'>
      <h1 className='text-2xl font-semibold mb-6'>Mes Candidatures</h1>

      <div id="infos" className='bg-blue-100 my-3 p-5 flex justify-between rounded-lg'>
        <p>Découvrez facilement les élections ouvertes et poser votre candidature facilement. </p>
        <p>Voir mes candidatures soumises</p>
      </div>

      <section>
        <h2 className='text-xl font-medium mb-4'>Elections Actuelles ouvertes</h2>

        <div className='flex flex-wrap justify-around items-center gap-[1%] gap-y-3'>
          {
            electionsCandidatures.map((cand, index) =>{
              return (
                <ElectionCard election={cand} key={index}/>
              )
            })
          }
        </div>

      </section>
    </div>
  )
}
