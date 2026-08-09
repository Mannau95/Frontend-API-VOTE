import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpAxiosClient } from "../client/httpClient";

export const fetchVotes = createAsyncThunk("votes/fetchVotes", async (queryParams = {}) => {
    const response = await httpAxiosClient.get("/votes/", { params: queryParams });
    const payload = response.data?.data ?? response.data?.votes ?? [];
    localStorage.setItem("inventaire_votes", JSON.stringify(payload));
    return payload;
});

export const fetchVotesByPeriod = createAsyncThunk("votes/fetchVotesByPeriod", async (queryParams = {}) => {
    const electionId = queryParams?.electionId;
    const url = electionId ? `/elections/${electionId}/stats/` : "/organisations/me/stats/";
    const response = await httpAxiosClient.get(url, { params: queryParams });
    const payload = response.data?.data ?? response.data;

    localStorage.setItem("inventaire_votes_by_period", JSON.stringify(payload));
    return payload;
});

export const createVote = createAsyncThunk("votes/createVote", async (voteData) => {
    const response = await httpAxiosClient.post("/votes/", voteData);
    const payload = response.data?.data ?? response.data;

    const existing = JSON.parse(localStorage.getItem("inventaire_votes") || "[]");
    existing.push(payload);
    localStorage.setItem("inventaire_votes", JSON.stringify(existing));
    return payload;
});

const voteSlice = createSlice({
    name: "votes",
    initialState: {
        items: { days: [] },
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchVotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchVotesByPeriod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVotesByPeriod.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchVotesByPeriod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createVote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVote.fulfilled, (state, action) => {
                state.loading = false;
                const current = Array.isArray(state.items) ? state.items : [];
                state.items = [...current, action.payload];
            })
            .addCase(createVote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearError } = voteSlice.actions;
export default voteSlice.reducer;