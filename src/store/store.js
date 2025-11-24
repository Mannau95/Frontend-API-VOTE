import { configureStore, } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import categoryReducer from './categorySlice'
// import basketReducer from './basketSlice'
import saleReducer from './saleSlice';
import userReducer from './user/userSlice'
export const store = configureStore({
    reducer:{
        user: userReducer,
        products: productReducer,
        categories: categoryReducer,
        // basket: basketReducer,
        sales: saleReducer
    }
})