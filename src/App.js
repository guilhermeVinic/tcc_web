import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import DashboardPage from './pages/dashboardpage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;