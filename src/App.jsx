import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Screening from './pages/Screening';
import ScreeningResult from './pages/ScreeningResult';
import Learn from './pages/Learn';
import AdminDashboard from './pages/AdminDashboard';
import Privacy from './pages/Privacy'; 
import Profile from './pages/Profile'; // 1. Import Profile
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* 2. Proteksi Screening agar hasil tersimpan ke akun user */}
        <Route 
          path="/screening" 
          element={
            <ProtectedRoute>
              <Screening />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/screening/result" 
          element={
            <ProtectedRoute>
              <ScreeningResult />
            </ProtectedRoute>
          } 
        />

        <Route path="/learn" element={<Learn />} />
        <Route path="/privacy" element={<Privacy />} /> 

        {/* 3. Tambahkan Route Profile (Hanya bisa diakses jika login) */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;