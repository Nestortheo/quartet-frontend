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

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MyNavbar />
      <main className="flex-1">
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
        </main>
        <Footer />
    </div>
  );
};

export default App; 