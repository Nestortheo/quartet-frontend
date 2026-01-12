import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import About from './pages/About';
import Concerts from './pages/Concerts';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Home from './pages/Home';
import TestApi from "./pages/TestApi";
import TestAuth from "./pages/TestAuth.jsx";
import AdminLogin from './pages/AdminLogin.jsx';
import CreateConcertPage from './pages/CreateConcertPage.jsx'
import VenueForm from "./pages/VenueForm";
import RequireAuth from './components/RequireAuth.jsx';
import Practice from './pages/Practice.jsx';
import EditConcertPage from './pages/EditConcertPage.jsx';
import ConcertDetail from "./pages/ConcertDetail.jsx";
import Footer from "./components/Footer";
import PracticePage from './pages/PracticePage.jsx';

const App = () => {
  return (
<div className="min-h-screen flex flex-col">
  <MyNavbar />

  {/* PAGE BACKGROUND (not header) */}
<main className="relative flex-1 overflow-hidden bg-[#f1ece6]">
  <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-br
          from-[#d6cfc7]
          via-[#efe8e1]
          to-[#f5f1ec]"
      />
      <div className="absolute top-1/4 -left-48 h-[800px] w-[800px] rounded-full bg-[#e2cbb4]/35 blur-3xl" />
      <div className="absolute bottom-0 -right-48 h-[700px] w-[700px] rounded-full bg-[#d1bfae]/30 blur-3xl" />
    </div>

    {/* Page content */}
    <div className="relative z-10 h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<TestApi />} />
        <Route path="/test-auth" element={<TestAuth />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/concerts/:id" element={<ConcertDetail />} />
        <Route path="/testpage/" element={<PracticePage/>} />

        <Route
          path="/createConcert"
          element={
            <RequireAuth>
              <CreateConcertPage />
            </RequireAuth>
          }
        />

        <Route
          path="/concerts/:id/edit"
          element={
            <RequireAuth>
              <EditConcertPage />
            </RequireAuth>
          }
        />

        <Route
          path="/venues/new"
          element={
            <RequireAuth>
              <VenueForm />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  </main>

  <Footer />
</div>
  );
};

export default App; 