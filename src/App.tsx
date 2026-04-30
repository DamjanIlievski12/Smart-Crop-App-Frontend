import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiseaseRiskPage from './pages/DiseaseRiskPage';
import FertilizerPage from './pages/FertilizerPage';
import LoginPage from './pages/LoginPage';
import FieldsPage from './pages/FieldsPage';
import AddFieldPage from './pages/AddFieldPage';
import CropAnalysisPage from './pages/CropAnalysisPage';
import WeatherPage from './pages/WeatherPage';
import type React from 'react';

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crop-analysis" element={<CropAnalysisPage />} />
        <Route path="/disease-risk" element={<DiseaseRiskPage />} />
        <Route path="/fertilizer" element={<FertilizerPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/fields" element={<FieldsPage />} />
        <Route path="/fields/new" element={<AddFieldPage />} />
      </Routes>
    </BrowserRouter>
  );
}
