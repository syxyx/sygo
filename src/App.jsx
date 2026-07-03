import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Prepare from './pages/Prepare';
import Life from './pages/Life';
import Pitfalls from './pages/Pitfalls';
import Majors from './pages/Majors';
import QA from './pages/QA';
import About from './pages/About';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/life" element={<Life />} />
          <Route path="/pitfalls" element={<Pitfalls />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
