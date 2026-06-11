// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
// Comment out missing slices for now
// import authReducer from './slices/authSlice';
// import uiReducer from './slices/uiSlice';
// import filterReducer from './slices/filterSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // auth: authReducer,
        // ui: uiReducer,
        // filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;