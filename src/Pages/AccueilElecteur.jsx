import React from 'react'

export default function AccueilElecteur() {
    const prochaines_elections = [
        {
            "name": "Election du Conseil d'Administration 2024",
            "debut" : "15 juillet 2024",
            "fin": "20 juillet 2024"

        },
        {
            "name": "Vote pour la Nouvelle Politique de Télétravail",
            "debut" : "01 août 2024",
            "fin": "05 août 2024"

        },
        {
            "name": "Election du Comité d'Entreprise",
            "debut" : "10 septembre 2024",
            "fin": "12 septembre 2024"

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

    return (
        <div className='p-5'>
            <section id="MotAccueilElecteur" className="flex gap-4 bg-blue-100 px-6 py-12 rounded-md my-4">
                {/* image */}
                <div className="w-20 rounded-full avatar">
                    <img
                    alt="Profil image" className='w-20 rounded-full'
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                </div>

                {/* Mot de bienvenu */}
                <div>
                    <p className="title text-2xl font-bold m-b-3">
                        Bomjour, Jean Doe!
                    </p>

                    <p className='txet-lg' >
                        Bienvenu sur votre tableau de bord Super Vote.
                        Gerer vos candidatures, suivez les elcetions en cours et consulter
                        les resultats recents.
                    </p>
                </div>
            </section>

            {/* les stqtistiques globales */}
            <section id='stats cles flex'>
                <p className='text-[1.15rem] font-semibold mb-3'>
                    Statistiques phares:
                </p>
                <div className="flex justify-between items-start ">
                    <div className='flex flex-col w-[31%] px-5 py-6 shadow-xs shadow-gray-300 relative'>
                        <p>Elections Actives</p>
                        <p className='font-bold text-2xl mt-2'>3</p>
                        <img src="img/timer_ico.png" alt="timer icon" className='w-7 h-6 absolute top-10 right-6'/>
                    </div>

                    <div className='flex flex-col w-[31%] px-5 py-6 shadow-xs shadow-gray-300 relative'>
                        <p>Candidature en Attente</p>
                        <p className='font-bold text-2xl mt-2'>2</p>
                        <img src="img/msg_ico.png" alt="timer icon" className='w-7 h-6 absolute top-10 right-6'/>
                    </div>

                    <div className='flex flex-col w-[31%] px-5 py-6 shadow-xs shadow-gray-300 relative'>
                        <p>Elections Participées</p>
                        <p className='font-bold text-2xl mt-2'>8</p>
                        <img src="img/success_ico.png" alt="timer icon" className='w-7 h-6 absolute top-10 right-6'/>
                    </div>

                    
                </div>

            </section>

            {/* PROCHAINES ELECTIONS */}
            <section>
                <p className='text-[1.15rem] font-semibold mb-5'>
                    Prochaines elections
                </p>

                <ul className='flex flex-col flex-wrap gap-5'>
                    {
                        prochaines_elections.map((election, index) => {
                            return (
                                <li key={index} className='bg-blue-50 p-3 ml-2 flex items-center gap-3 rounded-lg'>
                                    <img src="img/success_ico.png" alt="timer icon" className='w-7 h-6'/>
                                    <div className="text-content">
                                        <p className='font-semibold mb-3'>{ election.name }</p>
                                        <p>{ "Du " + election.debut + " au " + election.fin }</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

            {/* MES CANDIDATURES */}
            <section className='mx-2'>
                <p className='text-[1.15rem] font-semibold mb-5'>Mes Candidatures</p>

                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <th className='py-3 text-left px-4'>Election</th>
                        <th className='text-left px-4'>Statut</th>
                        <th className='text-left px-4'>Date de soumission</th>
                    </thead>

                    <tbody>
                        {
                            candidatures.map( (candidature, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            Object.keys(candidature).map((attr, index)=> {
                                                return (
                                                    <td className='py-2 px-4 shadow-xs shadow-gray-300 ' key={index}>{candidature[attr]}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>

        </div>
    )
}
