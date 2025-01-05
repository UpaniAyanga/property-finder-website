import 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Properties from './pages/Properties';
import Contact from './pages/Contact';
import FavouriteOption from './pages/FavouriteOption';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoPropertiesFound from "./pages/NoPropertyFound.jsx";
function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />
                <main className="my-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/favourites" element={<FavouriteOption />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/properties/:id" element={<PropertyDetails />} />
                        <Route path="/propertyNotFound" element={<NoPropertiesFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;