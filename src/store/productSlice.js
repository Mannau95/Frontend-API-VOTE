// store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Votre client axios
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations produits
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await httpAxiosClient.get('/products')
    localStorage.setItem('inventaire_products', JSON.stringify(response.data.items))
    return response.data.items
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await httpAxiosClient.post('/products', productData)
    const prods = JSON.parse(localStorage.getItem('inventaire_products'))
    prods.push(response.data)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedData, thunkApi) => {
    const {productId, productData} = updatedData
    // console.log(productId);
    
    try{
      const response = await httpAxiosClient.patch(`/products/${productId}`, productData)
      return response.data
    } catch(error){
      // console.log(error);
      
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    await httpAxiosClient.delete(`/products/${productId}`)
    return productId
  }
)

const productsSlice = createSlice({
  name: 'products',
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
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
      // update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // console.log(action)
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
        state.items.push(action.payload)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.data.message
      })
  },
})

export const { clearError } = productsSlice.actions
export default productsSlice.reducer