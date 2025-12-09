'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { DEMO_USERS } from '@/lib/constants';

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUserId = localStorage.getItem('demo_user_id');
        if (storedUserId) {
            const foundUser = DEMO_USERS.find(u => u.id === storedUserId);
            if (foundUser) setUser(foundUser);
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        const foundUser = DEMO_USERS.find(u => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('demo_user_id', foundUser.id);
        } else {
            alert('Kullanıcı bulunamadı!');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('demo_user_id');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
