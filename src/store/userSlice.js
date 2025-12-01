import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {httpAxiosClient} from "../client/httpClient.js";

// Async thunks pour les opérations catégories
export const fetchConnectedUser = createAsyncThunk(
    'user/fetchConnectedUser',
    async () => {
        const response = await httpAxiosClient.get('/categories')
        // localStorage.setItem("vote_access_token", response.data?.data?.access);
        // localStorage.setItem("vote_refresh_token", response.data?.data?.payload.refresh);
        // localStorage.setItem("vote_user", JSON.stringify(response.payload.user));
        return response.data
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
    'categories/updateProfil',
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
    'categories/deleteAccount',
    async (categoryId) => {
        await httpAxiosClient.delete(`/categories/${categoryId}`)
        return categoryId
    }
)

const initialState = {
    user: null,
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
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.data.message
            })
    }
})

export const { setUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer;