// store/slices/electionsSlice.js
import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations catégories
export const fetchElections = createAsyncThunk(
  'elections/fetchElections',
  async () => {
    const response = await httpAxiosClient.get('/elections/')
    localStorage.setItem('vote_elections', JSON.stringify(response.data.data))
    return response.data.data
  }
)

export const createElection = createAsyncThunk(
  'elections/createElection',
  async (electionData, thunkApi) => {
      try {
          const response = await httpAxiosClient.post('/elections/', electionData)
          const elections = JSON.parse(localStorage.getItem('vote_elections')) ?? []
          elections.push(response.data)
          localStorage.setItem('vote_elections', JSON.stringify(elections))
          return response.data
      } catch(error){

          return thunkApi.rejectWithValue(error)
      }
  }
)

export const updateElection = createAsyncThunk(
  'elections/updateElection',
  async (updatedData, thunkApi) => {
    const {electionId, electionData} = updatedData
    
    try{
      const response = await httpAxiosClient.put(`/elections/${electionId}`, electionData)
      // const elections = JSON.parse(localStorage.getItem('vote_elections'))
      return response.data
    } catch(error){
      
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteElection = createAsyncThunk(
  'elections/deleteElection',
  async (categoryId) => {
    await httpAxiosClient.delete(`/elections/${categoryId}`)
    return categoryId
  }
)

const electionsSlice = createSlice({
  name: 'elections',
  initialState: {
    elections: [],
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
      // Fetch Categories
      .addCase(fetchElections.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchElections.fulfilled, (state, action) => {
        state.loading = false
        state.elections = action.payload
      })
      .addCase(fetchElections.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Create Elections
      .addCase(createElection.fulfilled, (state, action) => {
        state.loading = false
        state.elections.push(action.payload)
      })
      .addCase(createElection.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createElection.rejected, (state, action) => {
        state.loading = false
        state.error = action?.error.message
      })
      // update Product
      .addCase(updateElection.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateElection.fulfilled, (state, action) => {
        // console.log(action)
        state.loading = false
        state.elections = state.elections.filter(item => item.id !== action.payload.id)
        state.elections.push(action.payload)
      })
      .addCase(updateElection.rejected, (state, action) => {
        state.loading = false
        
        state.error = action.payload.message || action.error.message
      })
      // Delete Elections
      .addCase(deleteElection.fulfilled, (state, action) => {
        state.loading = false
        state.elections = state.elections.filter(item => item.id !== action.payload)
      })
      .addCase(deleteElection.pending, (state, ) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteElection.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
  },
})

export const { clearError } = electionsSlice.actions
export default electionsSlice.reducer