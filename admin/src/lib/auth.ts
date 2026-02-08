/**
 * Auth Utilities
 * Manages admin authentication state
 */

const TOKEN_KEY = 'admin_token';

export const getAdminToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const setAdminToken = (token: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeAdminToken = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
};

export const checkAuth = (): boolean => {
    const token = getAdminToken();
    // Basic check - length > 0. server validates actual correctness
    return !!token && token.length > 0;
};

export const logout = () => {
    removeAdminToken();
    window.location.href = '/login';
};
