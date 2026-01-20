import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Auth from './pages/Auth'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import Matches from './pages/Matches'
import About from './pages/About'

function App() {
    return (
        <>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/report-lost" element={<ReportLost />} />
                    <Route path="/report-found" element={<ReportFound />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
