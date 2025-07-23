import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PostsPage from "@/pages/PostsPage";
import InfinitePostsPage from "@/pages/InfinitePostsPage";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/infinite-posts" element={<InfinitePostsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRouter;
