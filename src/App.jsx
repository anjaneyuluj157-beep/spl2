import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditablePage from "./components/EditablePage";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Admin from "./pages/Admin";
import Arjun from "./pages/Arjun";
import { loadPublishedPageOverrides } from "./data/pageOverrides";
import {
  About,
  Knowledge,
  Gallery,
  TeamDetail,
  Contact,
} from "./pages/StaticPages";

export default function App() {
  useEffect(() => {
    loadPublishedPageOverrides();
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<Layout />}>
        <Route path="/" element={<EditablePage pageId="home"><Home /></EditablePage>} />
        <Route path="/about" element={<EditablePage pageId="about"><About /></EditablePage>} />
        <Route path="/services" element={<EditablePage pageId="services"><Services /></EditablePage>} />
        <Route path="/arjun" element={<EditablePage pageId="arjun"><Arjun /></EditablePage>} />
        <Route path="/services/:slug" element={<EditablePage pageId="service-detail"><ServiceDetail /></EditablePage>} />
        <Route path="/knowledge-bank" element={<EditablePage pageId="knowledge"><Knowledge /></EditablePage>} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        <Route path="/team" element={<Navigate to="/about#team" replace />} />
        <Route path="/team/:slug" element={<EditablePage pageId="team-detail"><TeamDetail /></EditablePage>} />
        <Route path="/contact" element={<EditablePage pageId="contact"><Contact /></EditablePage>} />
        <Route path="*" element={<EditablePage pageId="home"><Home /></EditablePage>} />
      </Route>
    </Routes>
  );
}
