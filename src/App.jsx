import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiseaseRiskPage from './pages/DiseaseRiskPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/disease-risk" element={<DiseaseRiskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
