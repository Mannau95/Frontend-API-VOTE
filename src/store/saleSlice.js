import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpAxiosClient } from '../client/httpClient'

// Async thunks pour les opérations produits
export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (queryParams) => {
    // console.log();
    
    const response = await httpAxiosClient.get('/sales', {
        params:queryParams
    })
    localStorage.setItem('inventaire_sales', JSON.stringify(response.data.sales))
    // console.log(response.data);
    return response.data.sales
  }
)

export const fetchSalesByPeriod = createAsyncThunk(
    'sales/fetchSalesByPeriod',
    async (queryParams) => {
    //   console.log(queryParams);
      
      const response = await httpAxiosClient.get('/sales/reports/daily',{
          params:queryParams
      })
      localStorage.setItem('inventaire_sales_by_period', JSON.stringify(response.data))

      if(!queryParams){
        localStorage.setItem('inventaire_last_summary', response.data.period.split(' to ')[1])
      }
      // console.log(response.data);
      return response.data
    }
  )

export const createSale = createAsyncThunk(
  'sales/createSale',
  async (saleData) => {
    const response = await httpAxiosClient.post('/sales', saleData)
    const prods = JSON.parse(localStorage.getItem('inventaire_sales'))
    prods.push(response.data)
    return response.data
  }
)

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (saleId) => {
    await httpAxiosClient.delete(`/sales/${saleId}`)
    return saleId
  }
)

const saleSlice = createSlice({
    name: 'sales',
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
            // Fetch sales
            .addCase(fetchSales.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch sales by period
            .addCase(fetchSalesByPeriod.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSalesByPeriod.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchSalesByPeriod.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Create sale
            .addCase(createSale.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
            })
            .addCase(createSale.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Delete sale
            .addCase(deleteSale.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.loading = false
                state.items = state.items.filter(item => item.id !== action.payload)
            })
            .addCase(deleteSale.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { clearError } = saleSlice.actions
export default saleSlice.reducer