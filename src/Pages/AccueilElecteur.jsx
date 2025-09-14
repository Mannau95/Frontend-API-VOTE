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

    return (
        <div className='p-5'>
            <section id="MotAccueilElecteur" className="flex gap-4 bg-blue-100 px-6 py-12 rounded-md my-4">
                {/* image */}
                <img className='w-20% ' alt="ume irme"/>

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

            {/* les stqtistique */}
            <section id='stats cles flex'>
                <p className='text-[1.15rem] font-semibold mb-3'>
                    Statistiques phares:
                </p>
                <div className="flex justify-between items-start ">
                    <div className='flex flex-col'>
                        <p>Elections Actives</p>
                        <p className='text-bold text-2xl mt-2'>3</p>
                    </div>

                    <div className='flex flex-col'>
                        <p>Candidature en Attente</p>
                        <p className='text-bold text-2xl mt-2'>2</p>
                    </div>

                    <div className='flex flex-col'>
                        <p>Elections Participées</p>
                        <p className='text-bold text-2xl mt-2'>8</p>
                    </div>

                    
                </div>

            </section>

            <section className='mt-15'>
                <p className='text-[1.15rem] font-semibold mb-5'>
                    Prochaine elections
                </p>

                <ul className='flex flex-col gap-5'>
                    {
                        prochaines_elections.map((election, index) => {
                            return (
                                <li key={index} className='bg-gray-50 p-3 ml-2'>
                                    <p className='font-semibold'>{ election.name }</p>
                                    <p>{ "Du " + election.debut + " au " + election.fin }</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

        </div>
    )
}
