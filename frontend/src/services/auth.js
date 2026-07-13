// src/services/auth.js
import api from './api';

export const authService = {
    login: async (username, password) => {
        try {
            console.log('🔍 Login Request:', { username, password });

            const response = await api.post('/auth/sign', {
                username: username.trim(),
                password: password.trim(),
                device_id: ""
            });

            console.log('🔍 Response Data:', response.data);

            if (response.data?.status === true) {
                const data = response.data.data || {};
                const token = data.token || null;
                const refreshToken = data.refreshToken || null;
                const role = data.role || "";
                const fullName = data.fullName || "";
                const email = data.email || "";
                const userUsername = data.username || "";
                const expiresIn = data.expiresIn || null;

                // ===== SAVE TO LOCALSTORAGE =====
                if (token) {
                    localStorage.setItem('token', token);
                }
                
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                }
                
                localStorage.setItem('user', JSON.stringify({
                    username: userUsername,
                    fullName: fullName,
                    email: email,
                    role: role
                }));

                if (expiresIn) {
                    localStorage.setItem('expiresIn', String(expiresIn));
                }

                return {
                    success: true,
                    data: response.data,
                    token: token,
                    role: role
                };
            } else {
                return {
                    success: false,
                    message: response.data?.message || 'Login failed'
                };
            }
        } catch (error) {
            console.error(' Login Error:', error);
            
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.response) {
                errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               errorMessage;
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
            }
            
            throw new Error(errorMessage);
        }
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getUser: () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    getRole: () => {
        const user = authService.getUser();
        if (user && user.role) {
            return user.role.replace('ROLE_', '').toUpperCase();
        }
        return null;
    },

    isLoggedIn: () => {
        return !!authService.getToken();
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('expiresIn');
        window.location.href = '/login';
    }
};

export default authService;