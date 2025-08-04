import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import DbOperations from "./api/DbOperations";

// Створюємо екземпляр класу для роботи з базою даних
const db = new DbOperations("dreams");

// Створюємо API за допомогою RTK Query
// RTK Query автоматично генерує хуки для роботи з API
export const dreamsApi = createApi({
    reducerPath: "dreamsApi", // Унікальний ключ для цього API в Redux store
    baseQuery: fakeBaseQuery(), // Використовуємо fakeBaseQuery для роботи з Firebase
    tagTypes: ["Dream"], // Теги для кешування (коли оновлюємо мрію, інвалідуємо кеш)
    endpoints: (builder) => ({
        // Отримання всіх мрій без пагінації
        getAllDreams: builder.query({
            async queryFn() {
                try {
                    const data = await db.getAll();
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Dream"] // Цей запит надає тег "Dream"
        }),

        // Отримання мрій з пагінацією
        getDreams: builder.query({
            async queryFn({ page = 1, perPage = 6, cursors = [] }) {
                try {
                    const { data, cursor, hasMore } = await db.getAllPaginated({
                        page,
                        perPage,
                        cursors
                    });
                    return { data: { data, cursor, hasMore } };
                } catch (error) {
                    return { error: { status: 500, message: error.message } };
                }
            },
            providesTags: ["Dream"]
        }),

        // Отримання однієї мрії за ID
        getDreamById: builder.query({
            async queryFn(id) {
                try {
                    const data = await db.getById(id);
                    return { data };
                } catch (error) {
                    return { error };
                }
            }
        }),

        // Додавання нової мрії
        addDream: builder.mutation({
            async queryFn(dream) {
                try {
                    await db.add(dream);
                    return { data: true };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Dream"] // Інвалідуємо кеш після додавання
        }),

        // Оновлення існуючої мрії
        updateDream: builder.mutation({
            async queryFn({ id, data }) {
                try {
                    await db.update(id, data);
                    return { data: true };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Dream"] // Інвалідуємо кеш після оновлення
        }),

        // Видалення мрії
        deleteDream: builder.mutation({
            async queryFn(id) {
                try {
                    await db.delete(id);
                    return { data: true };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Dream"] // Інвалідуємо кеш після видалення
        })
    })
});

// Експортуємо автоматично згенеровані хуки
// useGetAllDreamsQuery - для отримання всіх мрій
// useGetDreamsQuery - для отримання мрій з пагінацією
// useGetDreamByIdQuery - для отримання однієї мрії
// useAddDreamMutation - для додавання мрії
// useUpdateDreamMutation - для оновлення мрії
// useDeleteDreamMutation - для видалення мрії
export const {
    useGetAllDreamsQuery,
    useGetDreamsQuery,
    useGetDreamByIdQuery,
    useAddDreamMutation,
    useUpdateDreamMutation,
    useDeleteDreamMutation
} = dreamsApi;
