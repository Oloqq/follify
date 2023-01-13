import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from './globalStyles';
import Home from './pages/homePage/Home';
import SettingPage from './pages/settingPage/SettingPage';
import Login from './pages/loginPage/Login';
import AboutUs from './pages/aboutPage/AboutPage';

function App() {
    return (
        <Router>
            <GlobalStyle/>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/settings' element={<SettingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about-us' element={<AboutUs />} />
            </Routes>
        </Router>
  );
}

export default App;
