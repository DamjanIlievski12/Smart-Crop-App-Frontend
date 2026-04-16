import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiseaseRiskPage from './pages/DiseaseRiskPage';
import FertilizerPage from './pages/FertilizerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/disease-risk" element={<DiseaseRiskPage />} />
        <Route path="/fertilizer" element={<FertilizerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
