import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./dashboard/Login.tsx"));
const Dashboard = lazy(() => import("./dashboard/Dashboard.tsx"));
const Register = lazy(() => import("./dashboard/Register.tsx"));
const TermsConditions = lazy(() => import("./dashboard/TermsConditions.tsx"));
const PasswordRecovery = lazy(() => import("./dashboard/PasswordRecovery.tsx"));
const FallBack = lazy(() => import("./dashboard/FallBack.tsx"));
const DashboardHome = lazy(
  () => import("./dashboard/components/DashboardHome.tsx")
);
const DashboardTransferences = lazy(
  () => import("./dashboard/components/DashboardTransferences.tsx")
);
const AdminDashboard = lazy(() => import("./dashboard/AdminDashboard.tsx"));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route
                path="transferences"
                element={<DashboardTransferences />}
              />
            </Route>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/passwordrecovery" element={<PasswordRecovery />} />
            <Route path="/termsconditions" element={<TermsConditions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export function Layout() {
  return (
    <>
      <div>
        <Suspense
          fallback={
            <div>
              <FallBack />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
