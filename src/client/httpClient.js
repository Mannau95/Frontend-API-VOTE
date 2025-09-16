import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const httpAxiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    baseURL: baseUrl,
    afterRequest: (response)=>{ console.log(response);},
    retry: {
        limit: 2,
        statusCodes: [401]
    },
    // withCredentials: true,
});

// --- gestion des flages et de la queue
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach( prom => {
//         if( error) {
//             prom.reject(error);
//         } else {
//             prom.resolve();
//         }
//     });
//     failedQueue = []
// }

// --- Fonstion de rafraichissement du token
// const refreshAccessTokwn = async () => {
//     try {
//         const refreshToken = localStorage.getItem('refresh_token');
//         const response = await httpAxiosClient.post('auth/token/refresh');
//         console.log(response);
        
//         return true;
//     } catch (error) {
//         window.location.href = '/login'
//         throw error
//     }
// }

// --- Intercepteur de Requetes --
httpAxiosClient.interceptors.request.use(
    async (config) => {
        // ajoute le token dans le header dans le cas ou token accessible
        if(localStorage && localStorage.getItem('access_token')){
            config.headers['Authorization']= `Bearer ${localStorage.getItem('access_token')}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// --- Intercepteur de Reponses --
// httpAxiosClient.interceptors.response.use(
//     (response) =>  response,
//     async (error) => {
//         const originalRequest = error.config

//         // verifier si code == 401 ou si rafraichissment
//         if( error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true

//             if(!isRefreshing){
//                 isRefreshing =true

//                 try {
//                     // tentative de rafraichissement du token
//                     await refreshAccessTokwn()
//                     isRefreshing = false;
//                     processQueue(null)

//                     // reessayer la requete avec de nouveau cookies
//                     return httpAxiosClient(originalRequest)
//                 } catch (refreshError) {
//                     //  si rafraichissement echoue 
//                     // rejeter toutes les requetes en attendant 
//                     processQueue(refreshError)
//                     return Promise.reject(refreshError);
//                 }
//             }

//             // si rafraichissement deja en cours , mettre file en file d'attente 
//             // la requete actuelle 
//             return new Promise( (resolve, reject) => {
//                 failedQueue.push({resolve, reject})
//             }).then( ()=> {
//                 // une fois refresh fini
//                 return httpAxiosClient(originalRequest)
//             }).catch( err => {
//                 return Promise.reject(err)
//             })

//         }
//     }
// )