import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children, role= '*'}) {
    const navigate = useNavigate()
    useEffect(
        ()=>{
            if(!localStorage){
                alert('No localStorage on this browser! Call tech team')
            }else{
                const user = JSON.parse(localStorage.getItem('vote_user'))
                if(!(user && (user[role] || role === '*' ) ) ){
                    navigate('/Connexion')
                }
            }
        }, []
    )
    
  return (
    <>{children}</>
  )
}
