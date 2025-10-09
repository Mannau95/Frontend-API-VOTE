import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const httpAxiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    baseURL: baseUrl,
    // afterRequest: (response)=>{ console.log(response);},
    retry: {
        limit: 2,
        statusCodes: [401]
    },
    // withCredentials: true,
});

// --- gestion des flages et de la queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach( prom => {
        if( error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = []
}

// --- Fonstion de rafraichissement du token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('vote_refresh_token');
        // config.headers['Authorization']= `${localStorage.getItem(env.VITE_LOCALSTORAGE_ACCESS_ROUTE)}`
        axios.post(baseUrl+'/auth/refresh', {}, {
            headers:{
                'Authorization':`Bearer ${refreshToken}`
            }
        })
        .then((data)=>{
            localStorage.setItem('vote_access_token', data.data['accessToken'])
            localStorage.setItem('vote_refresh_token', data.data['refreshToken'])
        })
        
        return true;
    } catch (error) {
        window.location.href = '/login'
        return Promise.reject(error)
    }
}

// --- Intercepteur de Requetes --
httpAxiosClient.interceptors.request.use(
    async (config) => {
        // ajoute le token dans le header dans le cas ou token accessible
        if(localStorage && localStorage.getItem('vote_access_token')){
            config.headers['Authorization']= `Bearer ${localStorage.getItem('vote_access_token')}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


// --- Intercepteur de Reponses --
httpAxiosClient.interceptors.response.use(
    (response) =>  response,
    async (error) => {
        // console.log('from interceptor ', error.response);
        
        const originalRequest = error.config

        // verifier si code == 401 ou si rafraichissment
        if( error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            if(!isRefreshing){
                isRefreshing =true

                try {
                    // tentative de rafraichissement du token
                    await refreshAccessToken()
                    isRefreshing = false;
                    processQueue(null)

                    // reessayer la requete avec de nouveau cookies
                    return httpAxiosClient(originalRequest)
                } catch (refreshError) {
                    //  si rafraichissement echoue 
                    // rejeter toutes les requetes en attendant 
                    processQueue(refreshError)
                    return Promise.reject(refreshError);
                }
            }

            // si rafraichissement deja en cours , mettre file en file d'attente 
            // la requete actuelle 
            return new Promise( (resolve, reject) => {
                failedQueue.push({resolve, reject})
            }).then( ()=> {
                // une fois refresh fini
                return httpAxiosClient(originalRequest)
            }).catch( err => {
                return Promise.reject(err)
            })

        }

        else if (error.response) {
            return Promise.reject({
                status: error.response.data?.status,
                message: error.response.data?.message || error.response.message || 'Une erreur est survenue. Veuillez réessayer.'
            })
        } else {
            return Promise.reject(error)
        }

        // return Promise.reject(error);
    }
)