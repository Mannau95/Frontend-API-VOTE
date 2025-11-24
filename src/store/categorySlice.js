// store/slices/categoriesSlice.js
import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations catégories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await httpAxiosClient.get('/categories')
    localStorage.setItem('inventaire_categories', JSON.stringify(response.data))
    return response.data
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    const response = await httpAxiosClient.post('/categories', categoryData)
    const categories = JSON.parse(localStorage.getItem('inventaire_categories'))
    categories.push(response.data)
    localStorage.setItem('inventaire_categories', JSON.stringify(categories))
    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (updatedData, thunkApi) => {
    const {categoryId, categoryData} = updatedData
    // console.log(categoryId);
    
    try{
      const response = await httpAxiosClient.patch(`/categories/${categoryId}`, categoryData)
      // const categories = JSON.parse(localStorage.getItem('inventaire_categories'))
      return response.data
    } catch(error){
      // console.log(error);
      
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    await httpAxiosClient.delete(`/categories/${categoryId}`)
    return categoryId
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
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
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // Create Category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // update Product
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        // console.log(action)
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload.id)
        state.items.push(action.payload)
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        
        state.error = action.payload.message || action.error.message
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteCategory.pending, (state, ) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
  },
})

export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer