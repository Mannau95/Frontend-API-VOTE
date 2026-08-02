import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {httpAxiosClient} from "../client/httpClient.js";

// Async thunks pour les opérations catégories
export const fetchElectors = createAsyncThunk(
    'user/fetchElectors',
    async () => {
        const response = await httpAxiosClient.get('/users/')
        localStorage.setItem("vote_electors", response.data?.data);
        // localStorage.setItem("vote_refresh_token", response.data?.data?.payload.refresh);
        // localStorage.setItem("vote_user", JSON.stringify(response.payload.user));
        return response.data.data
    }
)

export const fetchUserCandidatures = createAsyncThunk(
    'user/fetchUserCandidatures',
    async () => {
        const response = await httpAxiosClient.get('users/candidatures/')
        localStorage.setItem('vote_user_candidatures', JSON.stringify(response.data?.data))
        return response.data.data
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (loginData) => {
        const response = await httpAxiosClient.post("/auth/login/", loginData);
        localStorage.setItem("vote_access_token", response.data?.access);
        localStorage.setItem("vote_refresh_token", response.data?.refresh);
        localStorage.setItem("vote_user", JSON.stringify(response.data?.user));
        return response.data
    }
)

export const updateProfil = createAsyncThunk(
    'user/updateProfil',
    async (updatedData, thunkApi) => {
        const {categoryId, categoryData} = updatedData

        try{
            const response = await httpAxiosClient.patch(`/categories/${categoryId}`, categoryData)
            // const categories = JSON.parse(localStorage.getItem('inventaire_categories'))
            return response.data
        } catch(error){

            return thunkApi.rejectWithValue(error)
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async (categoryId) => {
        await httpAxiosClient.delete(`/categories/${categoryId}`)
        return categoryId
    }
)

const initialState = {
    user: JSON.parse(localStorage.getItem("vote_user")),
    electors: [],
    userCandidatures: [],
    loading: false,
    error: null
  };

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("vote_access_token", action.payload.access);
            localStorage.setItem("vote_refresh_token", action.payload.refresh);
            localStorage.setItem("vote_user", JSON.stringify(action.payload.user));
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder => {
        return builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                setUser(state, action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchElectors.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchElectors.fulfilled, (state, action) => {
                state.loading = false
                state.electors = action.payload
            })
            .addCase(fetchElectors.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch Candidatures
            .addCase(fetchUserCandidatures.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserCandidatures.fulfilled, (state, action) => {
                state.loading = false
                state.userCandidatures = action.payload
            })
            .addCase(fetchUserCandidatures.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { setUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer;