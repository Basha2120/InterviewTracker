import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-slate-400">View and manage your account details</p>
            </header>

            <div className="glass-card p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

                    {/* Avatar Section */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg border-4 border-[#1a1a2e]">
                            <User size={64} className="text-white opacity-90" />
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-[#1a1a2e] rounded-full" title="Online"></div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                <ShieldCheck size={14} />
                                {user.role === 'ADMIN' ? 'Administrator' : 'Standard User'}
                            </span>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-3">
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Mail size={18} className="text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email Address</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <User size={18} className="text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Account ID</p>
                                    <p className="font-medium text-slate-400">#{user.id || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Additional Sections could go here in the future - e.g. Settings, Password Reset */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="glass-card p-6 rounded-2xl opacity-70">
                    <h3 className="text-lg font-semibold text-white mb-2">Account Statistics</h3>
                    <p className="text-sm text-slate-400 mb-4">A quick overview of your activity will appear here soon.</p>
                    <div className="space-y-2">
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-1/3"></div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl opacity-70">
                    <h3 className="text-lg font-semibold text-white mb-2">Preferences</h3>
                    <p className="text-sm text-slate-400">Notification and UI preferences coming soon.</p>
                </div>
            </div>

        </div>
    );
}
