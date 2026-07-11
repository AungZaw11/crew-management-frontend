// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../common/components/Layout";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

// ✅ ပြီးသွားတဲ့ Features ကိုပဲ Import လုပ်ပါ
import crewRoutes from "./crewRoutes";
// ❌ မပြီးသေးတဲ့ဟာတွေကို Comment လုပ်ထားပါ
// import qualificationRoutes from "./qualificationRoutes";
// import appointmentRoutes from "./appointmentRoutes";
// import replacementRoutes from "./replacementRoutes";
// import paymentRoutes from "./paymentRoutes";
// import familyRoutes from "./familyRoutes";
// import injuryRoutes from "./injuryRoutes";
// import healthRoutes from "./healthRoutes";
// import experienceRoutes from "./experienceRoutes";
// import evaluationRoutes from "./evaluationRoutes";
// import accidentRoutes from "./accidentRoutes";

const Router = createBrowserRouter([
  // ===== Auth Routes (Login မလိုဘူး) =====
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },

  // ===== Protected Routes (Login လိုတယ်) =====
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          // ✅ Dashboard
          { path: "dashboard", element: <DashboardPage /> },
          
          // ✅ Crew Routes (ပြီးသွားတယ်)
          ...crewRoutes,
          
          // ❌ မပြီးသေးတဲ့ဟာတွေကို Comment လုပ်ထားပါ
          // ...qualificationRoutes,
          // ...appointmentRoutes,
          // ...replacementRoutes,
          // ...paymentRoutes,
          // ...familyRoutes,
          // ...injuryRoutes,
          // ...healthRoutes,
          // ...experienceRoutes,
          // ...evaluationRoutes,
          // ...accidentRoutes,
        ],
      },
    ],
  },
]);

export default Router;