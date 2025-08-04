import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/widgets";
import { HomePage, DreamsPage, DreamEditPage, PageNotFound } from "@/pages";
import DreamsLyricsPage from "@/pages/DreamsLyricsPage";

// Конфігурація маршрутів додатку
// Кожен маршрут має path (шлях) та Component (компонент для рендерингу)
export const routes = [
    {
        path: "/", // Головний маршрут
        Component: MainLayout, // Основний макет, який містить навігацію та футер
        children: [
            // Дочірні маршрути рендеряться всередині MainLayout
            {
                index: true, // Це головна сторінка (коли path = "/")
                Component: HomePage,
                meta: {
                    label: "Головна" // Назва для навігації
                }
            },
            {
                path: "dreams", // Шлях: /dreams
                Component: DreamsPage,
                meta: {
                    label: "Мої мрії"
                }
            },
            {
                path: "dreams-lyrics", // Шлях: /dreams-lyrics
                Component: DreamsLyricsPage,
                meta: {
                    label: "Мрій"
                }
            },
            {
                path: "/dreams/add", // Шлях для додавання нової мрії
                Component: DreamEditPage
            },
            {
                path: "/dreams/edit/:id", // Шлях для редагування мрії (:id - це параметр)
                Component: DreamEditPage
            },
            {
                path: "*", // Всі інші шляхи (404 сторінка)
                Component: PageNotFound
            }
        ]
    }
];

// Створюємо роутер для браузера
export const router = createBrowserRouter(routes);
