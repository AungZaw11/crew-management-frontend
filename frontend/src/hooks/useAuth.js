// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setUser } from '../redux/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, token } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSetUser = (userData) => {
        dispatch(setUser(userData));
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return {
        user,
        isAuthenticated,
        token,
        logout: handleLogout,
        setUser: handleSetUser,
    };
};