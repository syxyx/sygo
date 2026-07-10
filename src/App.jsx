import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Prepare from './pages/Prepare';
import Life from './pages/Life';
import Pitfalls from './pages/Pitfalls';
import Majors from './pages/Majors';
import QA from './pages/QA';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main key={location.pathname} className="page-transition" style={{ minHeight: '100vh' }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/life" element={<Life />} />
          <Route path="/pitfalls" element={<Pitfalls />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
