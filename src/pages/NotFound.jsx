import { Link } from 'react-router-dom';
import { Zap, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a]">
            <div className="text-center animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Zap size={36} className="text-white" />
                </div>
                <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
                <p className="text-xl text-slate-300 font-medium mb-2">Page Not Found</p>
                <p className="text-slate-500 mb-8">The route you're looking for doesn't exist.</p>
                <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
                    <Home size={16} /> Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
