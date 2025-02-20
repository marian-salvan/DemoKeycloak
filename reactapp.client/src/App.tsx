import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import ProfileButton from './components/ProfileButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
    return (
        <div>
            <LoginButton/>
            <ProfileButton/>
            <LogoutButton  />

            <BrowserRouter>    
                <Routes>
                    <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> }/>
                </Routes>
            </BrowserRouter>
      </div>

    );
}

export default App;