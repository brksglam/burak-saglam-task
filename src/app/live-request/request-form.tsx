'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { requestLessonAction } from '@/actions/matching-actions';
import { User } from '@/lib/types';

import toast from 'react-hot-toast';

interface Props {
    instructors: User[];
}

export default function LiveRequestForm({ instructors }: Props) {
    const { user } = useAuth();
    const [topic, setTopic] = useState('');
    const [selectedInstructorId, setSelectedInstructorId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error('Lütfen önce giriş yapın.');
            return;
        }
        if (user.role !== 'USER') {
            toast.error('Sadece öğrenciler ders talebi oluşturabilir.');
            return;
        }
        if (!topic.trim()) {
            toast.error('Lütfen bir ders konusu giriniz.');
            return;
        }
        if (!selectedInstructorId) {
            toast.error('Lütfen bir eğitmen seçiniz.');
            return;
        }

        setLoading(true);
        const toastId = toast.loading('Seçilen eğitmene talep iletiliyor...');

        try {
            const result = await requestLessonAction(user.id, topic, selectedInstructorId);

            if (result.success) {
                toast.success(result.message, { id: toastId, duration: 5000 });
                // Optional: Clear form
                // setTopic('');
            } else {
                toast.error(result.message || 'Bir hata oluştu.', { id: toastId });
            }

        } catch (err) {
            toast.error('Bir hata oluştu.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-50 rounded-full blur-2xl opacity-50"></div>

            <div className="relative">
                <div className="text-center mb-10">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Canlı Ders Başlat</h2>
                    <p className="mt-2 text-gray-500">Konuyu belirle, eğitmenini seç ve başla.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="instructor" className="block text-sm font-semibold text-gray-700 mb-2">
                            Eğitmen Seç
                        </label>
                        <select
                            id="instructor"
                            required
                            className="block w-full pl-3 pr-10 py-4 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm text-gray-900"
                            value={selectedInstructorId}
                            onChange={(e) => setSelectedInstructorId(e.target.value)}
                        >
                            <option value="">Bir eğitmen seçiniz...</option>
                            {instructors.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.name} (Online)</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                            Ders Konusu
                        </label>
                        <input
                            type="text"
                            id="topic"
                            required
                            className="block w-full pl-4 pr-12 py-4 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm placeholder-gray-400 text-gray-900"
                            placeholder="Örn: React Context API..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-4">
                            <p className="text-lg font-medium text-indigo-700 animate-pulse">Talep iletiliyor...</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !user}
                        className={`w-full flex items-center justify-center py-4 px-8 border border-transparent text-lg font-bold rounded-xl text-white shadow-lg transform transition-all duration-200 hover:-translate-y-1 ${!user || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200'}`}
                    >
                        {loading ? 'İşleniyor...' : 'Ders Talebi Gönder'}
                    </button>
                </form>

                {/* Success/Error messages are now handled via Toast */}

                {!user && (
                    <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm text-center border border-yellow-200">
                        ⚠️ Canlı ders talebi oluşturmak için lütfen demo hesaplardan biriyle giriş yapın.
                    </div>
                )}
            </div>
        </div>
    );
}
