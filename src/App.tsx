import React, { lazy, Suspense } from "react";
import Sidebar from "./components/layout/Sidebar";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

const TextPage = lazy(() => import("./pages/TextPage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <section className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<TextPage />} />
            <Route path="/images" element={<ImagePage />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
};

export default App;
