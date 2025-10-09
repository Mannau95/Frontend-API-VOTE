import { createSlice } from "@reduxjs/toolkit";

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
    }
})

export const { setUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer;