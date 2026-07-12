// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

// ===== FEATURE REDUCERS =====
import authReducer from "../features/auth/services/authSlice";
import crewReducer from "../features/crew/services/crewSlice";
import dashboardReducer from "../features/dashboard/services/dashboardSlice";
import calendarReducer from "../features/calendar/services/calendarSlice";
import personalInfoReducer from "../features/personal-info/services/personalInfoSlice";
import qualificationReducer from "../features/qualification/services/qualificationSlice";
import appointmentReducer from "../features/appointment/services/appointmentSlice";
import replacementReducer from "../features/replacement/services/replacementSlice"; 
import paymentReducer from "../features/payment/services/paymentSlice";
import familyReducer from "../features/family/services/familySlice";
import healthReducer from "../features/health/services/healthSlice";
 import experienceReducer from "../features/experience/services/experienceSlice";
// import evaluationReducer from "../features/evaluation/services/evaluationSlice";
// import accidentReducer from "../features/accident/services/accidentSlice";
// import qualificationReducer from "../features/qualification/services/qualificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crew: crewReducer,
    dashboard: dashboardReducer,
    calendar: calendarReducer,
    personalInfo: personalInfoReducer,
    qualification: qualificationReducer,
    appointment: appointmentReducer,
    replacement: replacementReducer,
    payment: paymentReducer,
    family: familyReducer,
    health: healthReducer,
    experience: experienceReducer,
    // evaluation: evaluationReducer,
    // accident: accidentReducer,
    // 
  },
  // ===== MIDDLEWARE CONFIGURATION =====
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist သုံးရင် ဒီဟာကို ထည့်ပါ
        // ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActions: [],
      },
    }),
  // ===== DEV TOOLS =====
  devTools: process.env.NODE_ENV !== 'production',
});

// ===== ROOT STATE TYPE (TypeScript အတွက်) =====
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;