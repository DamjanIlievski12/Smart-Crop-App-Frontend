import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DiseaseRiskPage from "./pages/DiseaseRiskPage";
import FertilizerPage from "./pages/FertilizerPage";
import LoginPage from "./pages/LoginPage";
import FieldsPage from "./pages/FieldsPage";
import AddFieldPage from "./pages/AddFieldPage";
import CropAnalysisPage from "./pages/CropAnalysisPage";
import ReportsPage from "./pages/ReportsPage";
import WeatherPage from "./pages/WeatherPage";
import type React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import FieldDetailsPage from "./pages/FieldDetailsPage";

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          // Public routes
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          // Protected routes
          <Route
            path="/crop-analysis"
            element={
              <ProtectedRoute>
                <CropAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease-risk"
            element={
              <ProtectedRoute>
                <DiseaseRiskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <ProtectedRoute>
                <FertilizerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <WeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields"
            element={
              <ProtectedRoute>
                <FieldsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields/new"
            element={
              <ProtectedRoute>
                <AddFieldPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields/:id"
            element={
              <ProtectedRoute>
                <FieldDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
