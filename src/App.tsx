import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import DashboardPage from "./pages/DashboardPage";
import AnalysisResultsProvider from "./providers/AnalysisResultsProvider";

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalysisResultsProvider>
          <Routes>
            // Public routes
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            // Protected routes
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
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
            // Catch-all: redirect to dashboard
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnalysisResultsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
