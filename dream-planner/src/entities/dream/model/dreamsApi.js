import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import DbOperations from "./api/DbOperations";
const db = new DbOperations("dreams");
export const dreamsApi = createApi({
    reducerPath: "dreamsApi", // Унікальний ключ для цього API в Redux store
    baseQuery: fakeBaseQuery(), // Використовуємо fakeBaseQuery для роботи з Firebase
    tagTypes: ["Dream"], // Теги для кешування (коли оновлюємо мрію, інвалідуємо кеш)
    endpoints: (builder) => ({
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
        getDreams: builder.query({
            async queryFn({
                page = 1,
                perPage = 6,
                cursors = [],
                sortBy = "date-desc"
            }) {
                try {
                    const { data, cursor, hasMore, totalPages } =
                        await db.getAllPaginated({
                            page,
                            perPage,
                            cursors,
                            sortBy // Додаємо sortBy у виклик
                        });
                    return { data: { data, cursor, hasMore, totalPages } };
                } catch (error) {
                    console.error("Dreams API error:", error);

                    // Спеціальна обробка помилки 429
                    if (error.message?.includes("ліміт запитів")) {
                        return {
                            error: {
                                status: 429,
                                message:
                                    "Перевищено ліміт запитів до Firebase. Спробуйте пізніше."
                            }
                        };
                    }

                    return {
                        error: {
                            status: 500,
                            message:
                                error.message || "Помилка завантаження мрій"
                        }
                    };
                }
            },
            providesTags: ["Dream"]
        }),
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
export const {
    useGetAllDreamsQuery,
    useGetDreamsQuery,
    useGetDreamByIdQuery,
    useAddDreamMutation,
    useUpdateDreamMutation,
    useDeleteDreamMutation
} = dreamsApi;
