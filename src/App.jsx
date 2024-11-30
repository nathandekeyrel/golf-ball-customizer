import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from 'src/components/NavBar.jsx'
import { Home, Design, Checkout } from "./pages";

const App = () => {
    return (
        <main className='bg-slate-300/20 min-h-screen'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/design" element={<Design />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </Router>
        </main>
    )
}

export default App;