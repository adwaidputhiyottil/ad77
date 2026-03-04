import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Navbar from './components/sections/Navbar';
import Footer from './components/sections/Footer';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/sections/ScrollToTop';
import LoadingScreen from './components/ui/LoadingScreen';

// 🚀 Lazy load pages for better performance
const Home = lazy(() => import('./pages/portfolio/Home'));
const Projects = lazy(() => import('./pages/portfolio/Projects'));
const ProjectDetails = lazy(() => import('./pages/portfolio/ProjectDetails'));
const ServicesPage = lazy(() => import('./pages/portfolio/Services'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));

// Header wrapper
const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return !isAdmin ? <Navbar /> : null;
};

// Footer wrapper
const FooterSection = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return !isAdmin ? <Footer /> : null;
};

// 🔒 Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
        <AuthProvider>
          <DataProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
              <FooterSection />
            </div>
          </DataProvider>
        </AuthProvider>
    </Router>
  );
}

export default App;