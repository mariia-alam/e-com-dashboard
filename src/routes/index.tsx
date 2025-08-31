import { createBrowserRouter, Navigate } from "react-router-dom";
import Products from "@/views/pages/products/Products";
import Login from "@/views/pages/Login";
import DashboardLayout from "@/layouts/DashboardLayout";
import ComingSoon from "@/views/pages/ComingSoon";
import ProductDetails from "@/views/pages/productDetails/ProductDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <DashboardLayout> <Products/> </DashboardLayout>
  },
  {
    path: `/products/:id`,
    element: <DashboardLayout> <ProductDetails/> </DashboardLayout>
  },
  {
    path: "*",
    element : <ComingSoon/>
  },
]);

export default router;
