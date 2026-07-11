// src/routes/paymentRoutes.jsx
import PaymentListPage from "../features/payment/pages/PaymentListPage";
import PaymentCreatePage from "../features/payment/pages/PaymentCreatePage";
import PaymentEditPage from "../features/payment/pages/PaymentEditPage";

const paymentRoutes = [
  { path: "crew/payment", element: <PaymentListPage /> },
  { path: "crew/payment/new", element: <PaymentCreatePage /> },
  { path: "crew/payment/:id/edit", element: <PaymentEditPage/>},
  { path: "crew/:id/payment/:itemId/edit", element: <PaymentEditPage /> },
];

export default paymentRoutes;
