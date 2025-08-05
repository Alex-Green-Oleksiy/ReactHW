import React, { useEffect, useState, useRef } from "react";
import { themeImages } from "@/shared/styles/theme-images";
import styles from "./BackgroundImage.module.scss";

const BackgroundImage = ({ theme }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [cachedImages, setCachedImages] = useState({});
    const [hasError, setHasError] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const backgroundRef = useRef(null);

    // Функція для визначення розміру екрану
    const getImageForScreenSize = () => {
        const width = window.innerWidth;

        if (width <= 768) {
            return "mobile";
        } else if (width <= 1024) {
            return "tablet";
        } else {
            return "desktop";
        }
    };

    // Функція для отримання поточного зображення
    const getCurrentImage = () => {
        const screenSize = getImageForScreenSize();
        const themeImagesSet =
            theme === "dark" ? themeImages.dark : themeImages.light;

        // Перевіряємо підтримку WebP
        if (screenSize === "mobile" && themeImagesSet.mobile) {
            return themeImagesSet.mobile;
        } else if (screenSize === "tablet" && themeImagesSet.tablet) {
            return themeImagesSet.tablet;
        } else {
            return themeImagesSet.desktop;
        }
    };

    // Попереднє завантаження зображень в кеш
    useEffect(() => {
        const preloadImages = () => {
            const imagePromises = [];
            const allImages = [
                ...Object.values(themeImages.light),
                ...Object.values(themeImages.dark)
            ];

            allImages.forEach((url) => {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        setCachedImages((prev) => ({
                            ...prev,
                            [url]: img
                        }));
                        resolve(img);
                    };
                    img.onerror = (error) => {
                        console.error(
                            "Помилка завантаження зображення:",
                            url,
                            error
                        );
                        reject(error);
                    };
                    img.src = url;
                });
                imagePromises.push(promise);
            });

            Promise.all(imagePromises)
                .then(() => {
                    setImagesLoaded(true);
                    setHasError(false);
                })
                .catch((error) => {
                    console.error("Помилка завантаження зображень:", error);
                    setHasError(true);
                    setImagesLoaded(true); // Все одно показуємо компонент
                });
        };

        preloadImages();
    }, []);

    // Оновлюємо фон при зміні теми або розміру екрану
    useEffect(() => {
        if (imagesLoaded && backgroundRef.current) {
            const newImage = getCurrentImage();
            setCurrentImage(newImage);

            // Якщо зображення вже в кеші, використовуємо його
            if (cachedImages[newImage]) {
                backgroundRef.current.style.setProperty(
                    "background-image",
                    `url(${newImage})`,
                    "important"
                );
            } else if (!hasError) {
                // Fallback з timestamp для уникнення кешування
                const timestamp = Date.now();
                const imageUrl = `${newImage}?t=${timestamp}`;
                backgroundRef.current.style.setProperty(
                    "background-image",
                    `url(${imageUrl})`,
                    "important"
                );
            }
        }
    }, [theme, imagesLoaded, cachedImages, hasError]);

    // Слухаємо зміни розміру вікна
    useEffect(() => {
        const handleResize = () => {
            if (imagesLoaded && backgroundRef.current) {
                const newImage = getCurrentImage();
                if (newImage !== currentImage) {
                    setCurrentImage(newImage);
                    backgroundRef.current.style.setProperty(
                        "background-image",
                        `url(${newImage})`,
                        "important"
                    );
                }
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, currentImage]);

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
                backgroundImage: hasError
                    ? "none"
                    : `url(${currentImage || getCurrentImage()})`,
                backgroundColor: hasError
                    ? theme === "dark"
                        ? "#1a1a1a"
                        : "#f5f5f5"
                    : "transparent"
            }}
        />
    );
};

export default BackgroundImage;
