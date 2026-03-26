import { useEffect, useState } from 'react';
import { getDashboard } from '../api/adminApi';
import { useAuth } from '../context/AuthContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Briefcase, Trophy, XCircle, Code2, TrendingUp } from 'lucide-react';

const CHART_COLORS = {
    APPLIED: '#60a5fa',
    OA: '#fbbf24',
    TECH: '#a78bfa',
    HR: '#818cf8',
    OFFER: '#34d399',
    REJECTED: '#f87171',
};

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="glass-card p-5 flex items-center gap-4 animate-slide-up">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={22} className="text-white" />
            </div>
            <div>
                <p className="text-slate-400 text-sm">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboard()
            .then(res => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const chartData = stats
        ? Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value }))
        : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Welcome back, <span className="gradient-text">{user?.name} 👋</span>
                </h1>
                <p className="text-slate-400 mt-1">Here's your placement journey overview</p>
            </div>

            {/* Grid of stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={Briefcase}
                    label="Total Applications"
                    value={stats?.totalApplications ?? 0}
                    color="bg-gradient-to-br from-blue-600 to-blue-700"
                />
                <StatCard
                    icon={Trophy}
                    label="Offers Received"
                    value={stats?.totalOffers ?? 0}
                    color="bg-gradient-to-br from-green-600 to-emerald-700"
                />
                <StatCard
                    icon={XCircle}
                    label="Rejections"
                    value={stats?.totalRejections ?? 0}
                    color="bg-gradient-to-br from-red-600 to-rose-700"
                />
                <StatCard
                    icon={Code2}
                    label="Problems Solved"
                    value={stats?.totalProblemsSolved ?? 0}
                    color="bg-gradient-to-br from-purple-600 to-indigo-700"
                />
            </div>

            {/* Bar chart */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={20} className="text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Application Status Breakdown</h2>
                </div>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} barSize={40} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                tick={{ fontSize: 11 }}
                                interval={0}
                                angle={-30}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis allowDecimals={false} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: '#1a1a2e',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#ffffff',
                                }}
                                itemStyle={{ color: '#ffffff' }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry) => (
                                    <Cell key={entry.name} fill={CHART_COLORS[entry.name] || '#6c63ff'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                        <Briefcase size={40} className="mb-2 opacity-30" />
                        <p>No applications yet. Start tracking your journey!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
