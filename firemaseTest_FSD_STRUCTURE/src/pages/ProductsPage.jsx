import { useState, useEffect, useMemo } from "react";
import { useGetProductsQuery } from "@/entities/product";
import { ProductList } from "@/widgets/ProductListWidget";
import { AddProductButton } from "@/features/product";
import { ProductFilter } from "@/features/product";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
    const [page, setPage] = useState(1);
    const [cursors, setCursors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const perPage = 4;

    // Логіка запиту даних
    const { data, isLoading } = useGetProductsQuery({
        page,
        perPage,
        cursors,
        orderByField: sortField,
        orderDirection: sortDirection
    });

    // Фільтрація продуктів за назвою
    const filteredProducts = useMemo(() => {
        const allProducts = data?.data || [];
        if (!searchTerm.trim()) return allProducts;
        return allProducts.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data?.data, searchTerm]);

    const hasMore = data?.hasMore;

    // Логіка для курсорів та зменшення сторінки при порожньому результаті
    useEffect(() => {
        if (data?.cursor && cursors.length < page) {
            setCursors((prev) => [...prev, data.cursor]);
        }
        if (data?.data.length === 0 && page > 1) {
            setPage((p) => p - 1);
        }
    }, [data, cursors?.length, page]);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h2 className={styles.title}>Products List (4 per page)</h2>
                <AddProductButton />
            </div>

            <div className={styles.filterSection}>
                <ProductFilter
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                />
            </div>

            <ProductList
                products={filteredProducts}
                page={page}
                setPage={setPage}
                hasMore={hasMore}
                isLoading={isLoading}
            />
        </div>
    );
}
