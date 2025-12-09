'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function Navbar() {
    const { user, login, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold text-indigo-600">
                                MiniPlatform
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Anasayfa
                            </Link>
                            <Link
                                href="/courses"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Eğitimler (Udemy)
                            </Link>
                            <Link
                                href="/live-request"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Canlı Ders (Uber)
                            </Link>
                            {user?.role === 'INSTRUCTOR' && (
                                <Link
                                    href="/instructor/dashboard"
                                    className="border-transparent text-red-500 hover:border-red-300 hover:text-red-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Eğitmen Paneli
                                </Link>
                            )}
                            {user?.role === 'USER' && (
                                <>
                                    <Link
                                        href="/my-courses"
                                        className="border-transparent text-indigo-500 hover:border-indigo-300 hover:text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Kurslarım
                                    </Link>
                                    <Link
                                        href="/my-requests"
                                        className="border-transparent text-green-500 hover:border-green-300 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Ders Taleplerim
                                    </Link>
                                </>
                            )}
                            {user?.role === 'ADMIN' && (
                                <Link
                                    href="/admin/dashboard"
                                    className="border-transparent text-purple-500 hover:border-purple-300 hover:text-purple-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Admin Paneli
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col text-right">
                                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                    <span className="text-xs text-indigo-600">{user.role}</span>
                                </div>
                                {user.avatarUrl && (
                                    <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                                )}
                                <button
                                    onClick={logout}
                                    className="ml-4 bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
                                >
                                    Çıkış
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <span className="text-sm text-gray-500 self-center mr-2">Demo Giriş:</span>
                                <button
                                    onClick={() => login('ahmet@demo.com')}
                                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-indigo-100"
                                >
                                    Öğrenci
                                </button>
                                <button
                                    onClick={() => login('zeynep@demo.com')}
                                    className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-100"
                                >
                                    Eğitmen
                                </button>
                                <button
                                    onClick={() => login('admin@demo.com')}
                                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm hover:bg-purple-100"
                                >
                                    Admin
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
