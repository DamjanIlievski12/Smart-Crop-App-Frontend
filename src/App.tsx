import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiseaseRiskPage from './pages/DiseaseRiskPage';
import FertilizerPage from './pages/FertilizerPage';
import LoginPage from './pages/LoginPage';
import FieldsPage from './pages/FieldsPage';
import AddFieldPage from './pages/AddFieldPage';
import CropAnalysisPage from './pages/CropAnalysisPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crop-analysis" element={<CropAnalysisPage />} />
        <Route path="/disease-risk" element={<DiseaseRiskPage />} />
        <Route path="/fertilizer" element={<FertilizerPage />} />
        <Route path="/fields" element={<FieldsPage />} />
        <Route path="/fields/new" element={<AddFieldPage />} />
      </Routes>
    </BrowserRouter>
  );
}
