import { useState, useEffect } from 'react';
import { getPracticeLogs, createPracticeLog, updatePracticeLog, deletePracticeLog } from '../api/practiceApi';
import { DIFFICULTY_COLORS, DIFFICULTY_OPTIONS, PRACTICE_STATUS_OPTIONS, PLATFORMS } from '../utils/constants';
import { Plus, Trash2, Edit2, X, Code2 } from 'lucide-react';

function PracticeForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial || {
        platform: '', problemTitle: '', difficulty: 'MEDIUM', status: 'SOLVED', date: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try { await onSave(form); } finally { setLoading(false); }
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
            <div className="modal-content">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-white">{initial ? 'Edit Log' : 'Add Practice Log'}</h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <select className="select-field" value={form.platform}
                        onChange={e => setForm({ ...form, platform: e.target.value })} required>
                        <option value="">Select Platform</option>
                        {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input className="input-field" placeholder="Problem Title" value={form.problemTitle}
                        onChange={e => setForm({ ...form, problemTitle: e.target.value })} required />
                    <div className="grid grid-cols-3 gap-3">
                        <select className="select-field" value={form.difficulty}
                            onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                            {DIFFICULTY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select className="select-field" value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}>
                            {PRACTICE_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <input type="date" className="input-field" value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (initial ? 'Update' : 'Add Log')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Practice() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editLog, setEditLog] = useState(null);

    const fetchLogs = () => {
        getPracticeLogs()
            .then(res => setLogs(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchLogs(); }, []);

    const handleCreate = async (form) => {
        await createPracticeLog(form);
        fetchLogs(); setShowForm(false);
    };

    const handleUpdate = async (form) => {
        await updatePracticeLog(editLog.id, form);
        fetchLogs(); setEditLog(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this log?')) return;
        await deletePracticeLog(id);
        fetchLogs();
    };

    const solved = logs.filter(l => l.status === 'SOLVED').length;
    const revision = logs.filter(l => l.status === 'REVISION').length;

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="page-header mb-0">Practice Logs</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {solved} solved · {revision} for revision
                    </p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={16} /> Add Log
                </button>
            </div>

            {/* Stats bars */}
            <div className="glass-card p-4 mb-6 flex gap-6 flex-wrap">
                {['EASY', 'MEDIUM', 'HARD'].map(d => {
                    const count = logs.filter(l => l.difficulty === d).length;
                    return (
                        <div key={d} className="flex items-center gap-2">
                            <span className={`status-badge ${DIFFICULTY_COLORS[d]}`}>{d}</span>
                            <span className="text-white font-bold">{count}</span>
                        </div>
                    );
                })}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                </div>
            ) : logs.length === 0 ? (
                <div className="glass-card p-12 text-center text-slate-500">
                    <Code2 size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No practice logs yet. Start logging your coding sessions!</p>
                </div>
            ) : (
                <>
                    {/* Desktop View (Table) */}
                    <div className="hidden xl:block glass-card overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-6 text-slate-400 text-sm font-medium uppercase tracking-wider whitespace-nowrap">Problem</th>
                                    <th className="text-left py-4 px-6 text-slate-400 text-sm font-medium uppercase tracking-wider whitespace-nowrap">Platform</th>
                                    <th className="text-left py-4 px-6 text-slate-400 text-sm font-medium uppercase tracking-wider whitespace-nowrap">Difficulty</th>
                                    <th className="text-left py-4 px-6 text-slate-400 text-sm font-medium uppercase tracking-wider whitespace-nowrap">Status</th>
                                    <th className="text-left py-4 px-6 text-slate-400 text-sm font-medium uppercase tracking-wider whitespace-nowrap">Date</th>
                                    <th className="py-4 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id} className="table-row">
                                        <td className="py-4 px-6 text-white font-medium whitespace-nowrap">{log.problemTitle}</td>
                                        <td className="py-4 px-6 text-slate-400 text-sm whitespace-nowrap">{log.platform}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className={`status-badge ${DIFFICULTY_COLORS[log.difficulty]}`}>{log.difficulty}</span>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className={`status-badge ${log.status === 'SOLVED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-400 text-sm whitespace-nowrap">{log.date || '—'}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button onClick={() => setEditLog(log)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(log.id)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile/Tablet View (Cards) - Now shows below XL (1280px) */}
                    <div className="xl:hidden space-y-4">
                        {logs.map(log => (
                            <div key={log.id} className="glass-card p-5 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-lg leading-tight truncate pr-16">{log.problemTitle}</h3>
                                        <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                                            <span className="font-medium">{log.platform}</span>
                                            {log.date && <span>• {log.date}</span>}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditLog(log)}
                                            className="p-2.5 bg-white/5 text-slate-400 hover:text-white rounded-xl active:scale-95 transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(log.id)}
                                            className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl active:scale-95 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                    <span className={`status-badge shrink-0 ${DIFFICULTY_COLORS[log.difficulty]}`}>
                                        {log.difficulty}
                                    </span>
                                    <span className={`status-badge shrink-0 ${log.status === 'SOLVED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                                        {log.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showForm && <PracticeForm onSave={handleCreate} onCancel={() => setShowForm(false)} />}
            {editLog && <PracticeForm initial={editLog} onSave={handleUpdate} onCancel={() => setEditLog(null)} />}
        </div>
    );
}
