import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Applications from '../pages/Applications';
import Practice from '../pages/Practice';
import AdminPanel from '../pages/AdminPanel';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import { useAuth } from '../context/AuthContext';

function Layout({ children }) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Navbar />
            <main className="flex-1 min-h-screen p-4 lg:p-8 pt-20 lg:pt-8 lg:ml-64 animate-fade-in">
                {children}
            </main>
        </div>
    );
}

function AppContent() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected user routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/applications" element={<Layout><Applications /></Layout>} />
                <Route path="/practice" element={<Layout><Practice /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
            </Route>

            {/* Protected admin route */}
            <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}
