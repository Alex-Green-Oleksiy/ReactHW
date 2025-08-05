import React, { useEffect, useState, useRef } from "react";
import { themeImages } from "@/shared/styles/theme-images";
import styles from "./BackgroundImage.module.scss";

const BackgroundImage = ({ theme }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [cachedImages, setCachedImages] = useState({});
    const backgroundRef = useRef(null);

    // Попереднє завантаження зображень в кеш
    useEffect(() => {
        const preloadImages = () => {
            const imagePromises = [];
            const imageUrls = [themeImages.dark, themeImages.light];

            imageUrls.forEach((url) => {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        setCachedImages((prev) => ({
                            ...prev,
                            [url]: img
                        }));
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = url;
                });
                imagePromises.push(promise);
            });

            Promise.all(imagePromises)
                .then(() => {
                    setImagesLoaded(true);
                })
                .catch((error) => {
                    console.error("Помилка завантаження зображень:", error);
                    setImagesLoaded(true); // Все одно показуємо компонент
                });
        };

        preloadImages();
    }, []);

    // Оновлюємо фон при зміні теми
    useEffect(() => {
        if (imagesLoaded && backgroundRef.current) {
            const backgroundImage =
                theme === "dark" ? themeImages.dark : themeImages.light;

            // Якщо зображення вже в кеші, використовуємо його
            if (cachedImages[backgroundImage]) {
                backgroundRef.current.style.setProperty(
                    "background-image",
                    `url(${backgroundImage})`,
                    "important"
                );
            } else {
                // Fallback з timestamp для уникнення кешування
                const timestamp = Date.now();
                const imageUrl = `${backgroundImage}?t=${timestamp}`;
                backgroundRef.current.style.setProperty(
                    "background-image",
                    `url(${imageUrl})`,
                    "important"
                );
            }
        }
    }, [theme, imagesLoaded, cachedImages]);

    // Рендеримо компонент тільки після завантаження зображень
    if (!imagesLoaded) {
        return null;
    }

    return (
        <div
            ref={backgroundRef}
            className={styles.background}
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundImage: `url(${
                    theme === "dark" ? themeImages.dark : themeImages.light
                })`
            }}
        />
    );
};

export default BackgroundImage;
