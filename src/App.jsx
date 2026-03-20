import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Calculator from './pages/calculator';
import CookiePolicy from './pages/policy';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/policy" element={<CookiePolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
