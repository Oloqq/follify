import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import GlobalStyle from './globalStyles';
import Home from './pages/homePage/Home';
import SettingsPage from './pages/settingsPage/SettingsPage';
import Login from './pages/loginPage/Login';



function App() {
    return (
        <Router>
            <GlobalStyle/>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
  );
}

export default App;
