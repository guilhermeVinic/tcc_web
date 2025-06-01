import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import DashboardPage from './pages/dashboardpage';
import AdminPage from './pages/adminpage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;