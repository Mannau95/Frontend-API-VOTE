// store/slices/candidatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Votre client axios
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations produits
export const fetchCandidatures = createAsyncThunk(
  'candidature/fetchCandidatures',
  async () => {
    const response = await httpAxiosClient.get('/candidatures')
    localStorage.setItem('vote_candidature', JSON.stringify(response.data.items))
    return response.data.items
  }
)

export const createCandidature = createAsyncThunk(
  'candidature/createCandidature',
  async (candidatureData) => {
    const response = await httpAxiosClient.post('/candidatures', candidatureData)
    const prods = JSON.parse(localStorage.getItem('vote_candidature')) ?? []
    prods.push(response.data)
    return response.data
  }
)

export const updateCandidature = createAsyncThunk(
  'candidature/updateCandidature',
  async (updatedData, thunkApi) => {
    const {candidatureId, candidatureData} = updatedData
    // console.log(candidatureId);
    
    try{
      const response = await httpAxiosClient.patch(`/candidatures/${candidatureId}`, candidatureData)
      return response.data
    } catch(error){
      // console.log(error);
      
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteCandidature = createAsyncThunk(
  'candidature/deleteCandidature',
  async (candidatureId) => {
    await httpAxiosClient.delete(`/candidatures/${candidatureId}`)
    return candidatureId
  }
)

const candidatureSlice = createSlice({
  name: 'candidature',
  initialState: {
    items: [],
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
      // Fetch Candidatures
      .addCase(fetchCandidatures.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCandidatures.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCandidatures.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // Create Candidature
      .addCase(createCandidature.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCandidature.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createCandidature.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // update Candidature
      .addCase(updateCandidature.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCandidature.fulfilled, (state, action) => {
        // console.log(action)
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
        state.items.push(action.payload)
      })
      .addCase(updateCandidature.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      // Delete Candidature
      .addCase(deleteCandidature.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCandidature.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteCandidature.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
  },
})

export const { clearError } = candidatureSlice.actions
export default candidatureSlice.reducer