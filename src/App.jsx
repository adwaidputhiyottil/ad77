import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Footer from './components/sections/Footer';
import Home from './pages/portfolio/Home';
import Projects from './pages/portfolio/Projects';
import ProjectDetails from './pages/portfolio/ProjectDetails';
import ServicesPage from './pages/portfolio/Services';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/sections/ScrollToTop';

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
      <DataProvider>
        <AuthProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
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
            </main>
            <FooterSection />
          </div>
        </AuthProvider>
      </DataProvider>
    </Router>
  );
}

export default App;