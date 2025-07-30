import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFound from "@/pages/NotFound";

// ледаче завантаження для всіх сторінок
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Patients = lazy(() => import("@/pages/Patients"));
const PatientDetails = lazy(() => import("@/pages/PatientDetails"));
const Doctors = lazy(() => import("@/pages/Doctors"));
const Appointments = lazy(() => import("@/pages/Appointments"));
const AppointmentDetails = lazy(() => import("@/pages/AppointmentDetails"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження дашборду..." />
                        }
                    >
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: "patients",
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження пацієнтів..." />
                        }
                    >
                        <Patients />
                    </Suspense>
                )
            },
            {
                path: "patients/:id",
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження деталей пацієнта..." />
                        }
                    >
                        <PatientDetails />
                    </Suspense>
                )
            },
            {
                path: "doctors",
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження лікарів..." />
                        }
                    >
                        <Doctors />
                    </Suspense>
                )
            },
            {
                path: "appointments",
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження записів..." />
                        }
                    >
                        <Appointments />
                    </Suspense>
                )
            },
            {
                path: "appointments/:id",
                element: (
                    <Suspense
                        fallback={
                            <LoadingSpinner message="Завантаження деталей запису..." />
                        }
                    >
                        <AppointmentDetails />
                    </Suspense>
                )
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);

export default router;
