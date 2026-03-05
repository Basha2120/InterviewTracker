// Dynamic API URL for development and production
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8080');

export const STATUS_COLORS = {
    APPLIED: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    OA: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    TECH: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    HR: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    OFFER: 'bg-green-500/20 text-green-400 border border-green-500/30',
    REJECTED: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export const DIFFICULTY_COLORS = {
    EASY: 'bg-green-500/20 text-green-400 border border-green-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    HARD: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export const STATUS_OPTIONS = ['APPLIED', 'OA', 'TECH', 'HR', 'OFFER', 'REJECTED'];
export const DIFFICULTY_OPTIONS = ['EASY', 'MEDIUM', 'HARD'];
export const PRACTICE_STATUS_OPTIONS = ['SOLVED', 'REVISION'];
export const PLATFORMS = ['LeetCode', 'CodeStudio', 'HackerRank', 'GeeksForGeeks', 'Codeforces', 'InterviewBit', 'Other'];
