// src/redux/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import crewReducer from "./slices/crewSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    crew: crewReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ===== REMOVE TypeScript syntax =====
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;