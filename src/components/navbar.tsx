'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function Navbar() {
    const { user, login, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                            ✨ MiniPlatform
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                            <Link
                                href="/"
                                className="text-gray-100 hover:text-purple-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                            >
                                🏠 Anasayfa
                            </Link>
                            <Link
                                href="/courses"
                                className="text-gray-100 hover:text-purple-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                            >
                                📚 Eğitimler
                            </Link>
                            <Link
                                href="/live-request"
                                className="text-gray-100 hover:text-purple-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                            >
                                🎯 Canlı Ders
                            </Link>
                            {user?.role === 'INSTRUCTOR' && (
                                <Link
                                    href="/instructor/dashboard"
                                    className="text-emerald-300 hover:text-emerald-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-500/10"
                                >
                                    👨‍🏫 Eğitmen Paneli
                                </Link>
                            )}
                            {user?.role === 'USER' && (
                                <Link
                                    href="/my-courses"
                                    className="text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-500/10"
                                >
                                    📖 Kurslarım
                                </Link>
                            )}
                            {user?.role === 'ADMIN' && (
                                <Link
                                    href="/admin/dashboard"
                                    className="text-amber-300 hover:text-amber-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-amber-500/10"
                                >
                                    ⚙️ Admin Paneli
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col text-right">
                                    <span className="text-sm font-semibold text-white">{user.name}</span>
                                    <span className="text-xs text-purple-300 uppercase tracking-wide">{user.role}</span>
                                </div>
                                {user.avatarUrl && (
                                    <img className="h-10 w-10 rounded-full ring-2 ring-purple-400/50 hover:ring-purple-400 transition-all" src={user.avatarUrl} alt={user.name} />
                                )}
                                <button
                                    onClick={logout}
                                    className="ml-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105"
                                >
                                    Çıkış
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-gray-300 mr-2">Demo:</span>
                                <button
                                    onClick={() => login('ahmet@demo.com')}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                    👨‍🎓 Öğrenci
                                </button>
                                <button
                                    onClick={() => login('zeynep@demo.com')}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                    👨‍🏫 Eğitmen
                                </button>
                                <button
                                    onClick={() => login('admin@demo.com')}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                                >
                                    ⚙️ Admin
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
}
