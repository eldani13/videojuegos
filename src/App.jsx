import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import './index.css';
import './App.css';
import About from './pages/About';
import Login from './auth/login';
import Contact from './pages/Contact';
import Games from './pages/Games';
import Preview from './pages/Preview';
import SearchResults from './pages/SearchResults';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games" element={<Games />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Preview/:productId" element={<Preview />} />
        <Route path="/Search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
