import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home';
import About from './pages/About';
import Rickroll from './pages/Rickroll';

function App() {
    return (
        <Router>
        <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rickroll" element={<Rickroll />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;