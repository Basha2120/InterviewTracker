import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Briefcase, Code2, Shield, LogOut, Zap, User, Menu, X as CloseIcon
} from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
        { to: "/applications", icon: <Briefcase size={18} />, label: "Applications" },
        { to: "/practice", icon: <Code2 size={18} />, label: "Practice Logs" },
    ];

    return (
        <>
            {/* Desktop Sidebar / Mobile Menu (Slides from right on mobile) */}
            <aside className={`
                fixed top-0 h-screen w-64 bg-[#1a1a2e] border-l border-white/10 flex flex-col z-50
                transition-all duration-300 ease-in-out
                ${isOpen ? 'right-0' : '-right-64'} 
                lg:left-0 lg:right-auto lg:border-r lg:border-l-0
            `}>
                {/* Logo Section / Title */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                            <Zap size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold gradient-text">InterviewSprint</h1>
                            <p className="text-xs text-slate-500">Placement Tracker</p>
                        </div>
                    </div>
                    {/* Close button for mobile menu */}
                    <button className="lg:hidden text-white" onClick={toggleMenu}>
                        <CloseIcon size={24} />
                    </button>
                </div>

                {/* User info */}
                <div className="px-4 py-4 border-b border-white/10">
                    <NavLink to="/profile" onClick={() => setIsOpen(false)} className="block group">
                        <div className="glass-card p-3 flex items-center gap-3 group-hover:bg-white/10 transition-colors cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow">
                                <User size={16} className="text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate group-hover:text-purple-300 transition-colors">{user?.name}</p>
                                <p className="text-xs text-slate-400 truncate">{user?.role === 'ADMIN' ? 'Administrator' : 'User'}</p>
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}

                    {user?.role === 'ADMIN' && (
                        <NavLink
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <Shield size={18} />
                            Admin Panel
                        </NavLink>
                    )}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-40">
                <div className="flex items-center gap-2">
                    <Zap size={20} className="text-purple-500" />
                    <span className="font-bold text-lg gradient-text">InterviewSprint</span>
                </div>
                <button className="text-white p-2" onClick={toggleMenu}>
                    <Menu size={24} />
                </button>
            </header>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
}
