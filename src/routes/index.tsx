import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

// lazy imports
const Products = lazy(() => import("@/views/pages/products/Products"));
const Login = lazy(() => import("@/views/pages/Login"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const ComingSoon = lazy(() => import("@/views/pages/ComingSoon"));
const ProductDetails = lazy(() => import("@/views/pages/productDetails/ProductDetails"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
  {
    path: "/products",
    element: (
        <DashboardLayout>
          <Products />
        </DashboardLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
        <DashboardLayout>
          <ProductDetails />
        </DashboardLayout>
    ),
  },
  {
    path: "*",
    element: (
        <ComingSoon />
    ),
  },
]);

export default router;
