import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/Layout";
import SimpleLayout from "@/layout/SimpleLayout";
import frontRoutes from "@/routes/frontRoutes";
import Home from "@/pages/Home/Home";
import TeachersList from "@/pages/teachers/TeachersList/TeachersList";
import TeachersForm from "@/pages/teachers/TeachersForm/TeachersForm";
import TeachersDetail from "@/pages/teachers/TeachersDetail/TeachersDetail";
import Meeting from "@/pages/Meeting/Meeting";
import AboutApp from "@/pages/AboutApp/AboutApp";
import AboutDev from "@/pages/AboutDev/AboutDev";
import Page404 from "@/pages/Page404/Page404";

function AppRoutes() {
    return (
        <Routes>
            {/* ---------- MainLayout */}
            <Route element={<MainLayout />}>
                <Route path={frontRoutes.pages.home} element={<Home />} />
                <Route path={frontRoutes.pages.teachers.index}>
                    <Route index element={<TeachersList />} />
                    <Route
                        path={frontRoutes.pages.teachers.add}
                        element={<TeachersForm />}
                    />
                    <Route
                        path={frontRoutes.pages.teachers.edit}
                        element={<TeachersForm />}
                    />
                    <Route
                        path={frontRoutes.pages.teachers.detail}
                        element={<TeachersDetail />}
                    />
                </Route>
                <Route path={frontRoutes.pages.meeting} element={<Meeting />} />
            </Route>
            {/* ---------- SimpleLayout */}
            <Route element={<SimpleLayout />}>
                <Route
                    path={frontRoutes.pages.aboutApp}
                    element={<AboutApp />}
                />
                <Route
                    path={frontRoutes.pages.aboutDev}
                    element={<AboutDev />}
                />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
