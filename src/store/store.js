import { configureStore, } from "@reduxjs/toolkit";
import electionReducer from './electionSlice.js'
import candidatureReducer from './candidatureSlice.js'
import voteReducer from './voteSlice.js'
import userReducer from './userSlice.js'
export const store = configureStore({
    reducer:{
        user: userReducer,
        elections: electionReducer,
        candidatures: candidatureReducer,
        // basket: basketReducer,
        votes: voteReducer,
    }
})