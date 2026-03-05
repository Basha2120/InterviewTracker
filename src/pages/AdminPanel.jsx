import { useEffect, useState } from 'react';
import { getAllUsers, adminDeleteUser } from '../api/adminApi';
import { Trash2, Users, Shield } from 'lucide-react';

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete user "${name}"? This will remove all their data.`)) return;
        await adminDeleteUser(id);
        fetchUsers();
    };

    const totalApps = users.reduce((sum, u) => sum + (u.totalApplications || 0), 0);

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="page-header mb-0">Admin Panel</h1>
                    <p className="text-slate-400 text-sm">{users.length} users · {totalApps} total applications</p>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-sm">
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">{users.length}</p>
                    <p className="text-slate-400 text-sm mt-1">Total Users</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">{totalApps}</p>
                    <p className="text-slate-400 text-sm mt-1">Applications</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                </div>
            ) : users.length === 0 ? (
                <div className="glass-card p-12 text-center text-slate-500">
                    <Users size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No users found.</p>
                </div>
            ) : (
                <div className="glass-card overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">#</th>
                                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Name</th>
                                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Email</th>
                                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Role</th>
                                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Applications</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user.id} className="table-row">
                                    <td className="py-3 px-4 text-slate-500 text-sm">{i + 1}</td>
                                    <td className="py-3 px-4 text-white font-medium">{user.name}</td>
                                    <td className="py-3 px-4 text-slate-400 text-sm">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`status-badge ${user.role === 'ADMIN'
                                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-white font-semibold">{user.totalApplications}</td>
                                    <td className="py-3 px-4">
                                        {user.role !== 'ADMIN' && (
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
