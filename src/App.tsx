import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewsArticlePage from './pages/NewsArticlePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

// Public Website Components
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import LogoSection from './sections/LogoSection';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import News from './sections/News';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Admin Dashboard Components
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ContentManager from './admin/ContentManager';
import ServicesManager from './admin/ServicesManager';
import ProjectsManager from './admin/ProjectsManager';
import TestimonialsManager from './admin/TestimonialsManager';
import NewsManager from './admin/NewsManager';
import MessagesManager from './admin/MessagesManager';

// Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Public Website Page
function PublicWebsite() {
  return (
    <div className="min-h-screen bg-white font-cairo overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <LogoSection />
        <Services />
        <Projects />
        <Testimonials />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicWebsite />} />
      <Route path="/news/:id" element={<NewsArticlePage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="messages" element={<MessagesManager />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
