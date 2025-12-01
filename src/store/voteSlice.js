import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations produits
export const fetchVotes = createAsyncThunk(
  'votes/fetchVotes',
  async (queryParams) => {
    // console.log();
    
    const response = await httpAxiosClient.get('/votes', {
        params:queryParams
    })
    localStorage.setItem('inventaire_votes', JSON.stringify(response.data.votes))
    // console.log(response.data);
    return response.data.votes
  }
)

export const fetchVotesByPeriod = createAsyncThunk(
    'votes/fetchVotesByPeriod',
    async (queryParams) => {
    //   console.log(queryParams);
      
      const response = await httpAxiosClient.get('/votes/reports/daily',{
          params:queryParams
      })
      localStorage.setItem('inventaire_votes_by_period', JSON.stringify(response.data))

      if(!queryParams){
        localStorage.setItem('inventaire_last_summary', response.data.period.split(' to ')[1])
      }
      // console.log(response.data);
      return response.data
    }
  )

export const createVote = createAsyncThunk(
  'votes/createVote',
  async (voteData) => {
    const response = await httpAxiosClient.post('/votes', voteData)
    const prods = JSON.parse(localStorage.getItem('inventaire_votes'))
    prods.push(response.data)
    return response.data
  }
)

const voteSlice = createSlice({
    name: 'votes',
    initialState: {
        items: {'days':[]},
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch votes
            .addCase(fetchVotes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchVotes.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchVotes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch votes by period
            .addCase(fetchVotesByPeriod.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchVotesByPeriod.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchVotesByPeriod.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Create vote
            .addCase(createVote.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createVote.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
            })
            .addCase(createVote.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { clearError } = voteSlice.actions
export default voteSlice.reducer