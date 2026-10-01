import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import {
  About,
  Knowledge,
  Gallery,
  TeamDetail,
  Contact,
} from "./pages/StaticPages";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/knowledge-bank" element={<Knowledge />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        <Route path="/team" element={<Navigate to="/about#team" replace />} />
        <Route path="/team/:slug" element={<TeamDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
