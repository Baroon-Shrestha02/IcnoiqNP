import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import About from "./Pages/About";
import Project from "./Pages/Project";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Client from "./Pages/Client";
import ScrollToTop from "./Components/HelperComponents/ScrollToTop";
import Pricing from "./Pages/Pricing";
import { Toaster } from "react-hot-toast";
import Chat2 from "./Components/ChatComponents/Chat2";
import ChatPage from "./Pages/ChatPage";

import AdminPanel from "./Components/ChatComponents/AdminPanel";
import LoginDialog from "./Components/ChatComponents/LoginDialog";
import AdminRoutes from "./Routes/AdminRoutes";
import BlogPage from "./Pages/BlogPage";
import BlogDescription from "./Components/BlogComponents/BlogDescription";
import BlogMarkdownForm from "./Components/BlogComponents/BlogMarkdownForm";
import Policy from "./Pages/Policy";

import api from "./Components/Utils/api";
import { useAuth } from "./Components/Context/useAuth";
import BlogUpdateForm from "./Components/BlogComponents/BlogUpdateForm";
import Terms from "./Pages/Terms";
import NotFound from "./Components/HelperComponents/NotFound";

export default function App() {
  const [adminState, setAdminState] = useState(null);
  const { admin } = useAuth();
  const location = useLocation();

  // Hide Nav and Footer on these paths
  const hiddenRoutes = ["/chat", "/add", "/admin"];
  const shouldHideLayout =
    hiddenRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/update") ||
    location.pathname === "/404" ||
    location.pathname === "*";

  useEffect(() => {
    api
      .get(`/me`, { withCredentials: true })
      .then((res) => {
        setAdminState(res.data.username);
      })
      .catch(() => setAdminState(null));
  }, []);

  return (
    <>
      <div className="bg-[#FAF7F0]">
        <Toaster position="top-center" />
        <ScrollToTop />

        {!admin && <Chat2 />}

        {/* Conditionally render Nav */}
        {/* {!shouldHideLayout && <Nav />} */}
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/client" element={<Client />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog/:id" element={<BlogDescription />} />

          <Route
            path="/add"
            element={
              <AdminRoutes>
                <BlogMarkdownForm />
              </AdminRoutes>
            }
          />
          <Route
            path="/update/:blogId"
            element={
              <AdminRoutes>
                <BlogUpdateForm />
              </AdminRoutes>
            }
          />

          <Route
            path="/chat"
            element={
              <AdminRoutes>
                <ChatPage />
              </AdminRoutes>
            }
          />

          <Route
            path="/admin"
            element={
              adminState ? (
                <AdminPanel />
              ) : (
                <LoginDialog onLogin={setAdminState} />
              )
            }
          />

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!shouldHideLayout && <Footer />}
        {/* <Footer /> */}
      </div>
    </>
  );
}
