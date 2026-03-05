import { useState, useEffect, useCallback } from 'react';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../api/applicationApi';
import { getRounds, addRound, deleteRound } from '../api/roundApi';
import { STATUS_COLORS, STATUS_OPTIONS, DIFFICULTY_COLORS } from '../utils/constants';
import { Plus, Search, Filter, Trash2, Edit2, ChevronDown, ChevronUp, Star, X } from 'lucide-react';

function RoundModal({ applicationId, onClose }) {
    const [rounds, setRounds] = useState([]);
    const [form, setForm] = useState({ roundName: '', date: '', feedback: '', rating: 3 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRounds(applicationId).then(res => setRounds(res.data)).catch(console.error);
    }, [applicationId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await addRound(applicationId, form);
            setRounds([...rounds, res.data]);
            setForm({ roundName: '', date: '', feedback: '', rating: 3 });
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        await deleteRound(id);
        setRounds(rounds.filter(r => r.id !== id));
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-content max-w-2xl">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-white">Interview Rounds</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>

                {/* Existing rounds */}
                <div className="space-y-3 max-h-60 overflow-y-auto mb-5">
                    {rounds.length === 0 && <p className="text-slate-500 text-sm">No rounds recorded yet.</p>}
                    {rounds.map(r => (
                        <div key={r.id} className="glass-card p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white font-semibold">{r.roundName}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{r.date} · Rating: {'★'.repeat(r.rating || 0)}{'☆'.repeat(5 - (r.rating || 0))}</p>
                                    {r.feedback && <p className="text-slate-300 text-sm mt-2">{r.feedback}</p>}
                                </div>
                                <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 ml-2">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add new round form */}
                <form onSubmit={handleAdd} className="border-t border-white/10 pt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Add Round</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <input className="input-field" placeholder="Round name (e.g. Technical 1)" value={form.roundName}
                            onChange={e => setForm({ ...form, roundName: e.target.value })} required />
                        <input type="date" className="input-field" value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div className="flex gap-3">
                        <select className="select-field" value={form.rating}
                            onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}>
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>Rating: {n}/5</option>)}
                        </select>
                    </div>
                    <textarea className="input-field resize-none" rows={2} placeholder="Feedback (optional)"
                        value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} />
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Round'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ApplicationForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial || {
        companyName: '', role: '', status: 'APPLIED', appliedDate: '', notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
            <div className="modal-content">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-white">{initial ? 'Edit Application' : 'New Application'}</h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input className="input-field" placeholder="Company Name" value={form.companyName}
                        onChange={e => setForm({ ...form, companyName: e.target.value })} required />
                    <input className="input-field" placeholder="Role / Position" value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })} required />
                    <div className="grid grid-cols-2 gap-3">
                        <select className="select-field" value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <input type="date" className="input-field" value={form.appliedDate}
                            onChange={e => setForm({ ...form, appliedDate: e.target.value })} />
                    </div>
                    <textarea className="input-field resize-none" rows={3} placeholder="Notes (optional)"
                        value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                    <div className="flex gap-2 justify-end pt-1">
                        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (initial ? 'Update' : 'Add Application')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Applications() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editApp, setEditApp] = useState(null);
    const [roundAppId, setRoundAppId] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchApps = useCallback(() => {
        setLoading(true);
        getApplications({ status: statusFilter, company: search })
            .then(res => setApps(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [search, statusFilter]);

    useEffect(() => { fetchApps(); }, [fetchApps]);

    const handleCreate = async (form) => {
        await createApplication(form);
        fetchApps();
        setShowForm(false);
    };

    const handleUpdate = async (form) => {
        await updateApplication(editApp.id, form);
        fetchApps();
        setEditApp(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this application?')) return;
        await deleteApplication(id);
        fetchApps();
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="page-header mb-0">Job Applications</h1>
                    <p className="text-slate-400 text-sm mt-1">{apps.length} applications tracked</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={16} /> Add Application
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className="input-field pl-9 py-2" placeholder="Search by company..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="relative">
                    <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <select className="select-field pl-9 py-2 pr-8" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="">All Statuses</option>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Applications List */}
            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                </div>
            ) : apps.length === 0 ? (
                <div className="glass-card p-12 text-center text-slate-500">
                    <Plus size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No applications found. Add your first one!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {apps.map(app => (
                        <div key={app.id} className="glass-card p-5 hover:bg-white/[0.07] transition-all duration-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-white font-semibold text-lg">{app.companyName}</h3>
                                        <span className={`status-badge ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-0.5">{app.role}</p>
                                    {app.appliedDate && (
                                        <p className="text-slate-500 text-xs mt-1">Applied: {app.appliedDate}</p>
                                    )}
                                    {app.notes && (
                                        <p className="text-slate-400 text-sm mt-2 bg-white/5 rounded-lg p-2">{app.notes}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4 shrink-0">
                                    <button
                                        onClick={() => setRoundAppId(app.id)}
                                        className="btn-secondary text-xs py-1.5 px-3"
                                    >
                                        Rounds
                                    </button>
                                    <button onClick={() => setEditApp(app)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10">
                                        <Edit2 size={15} />
                                    </button>
                                    <button onClick={() => handleDelete(app.id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && <ApplicationForm onSave={handleCreate} onCancel={() => setShowForm(false)} />}
            {editApp && <ApplicationForm initial={editApp} onSave={handleUpdate} onCancel={() => setEditApp(null)} />}
            {roundAppId && <RoundModal applicationId={roundAppId} onClose={() => setRoundAppId(null)} />}
        </div>
    );
}
