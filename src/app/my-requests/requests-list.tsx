'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getMyRequestsAction, cancelRequestAction } from '@/actions/student-actions';
import { LessonRequest } from '@/lib/types';
import toast from 'react-hot-toast';

export default function MyRequestsList() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<LessonRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        if (!user) return;

        setLoading(true);
        const result = await getMyRequestsAction(user.id);
        if (result.success) {
            setRequests(result.requests);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, [user]);

    const handleCancel = async (requestId: string) => {
        if (!user) return;
        if (!confirm('Bu talebi iptal etmek istediğinizden emin misiniz?')) return;

        const toastId = toast.loading('Talep iptal ediliyor...');
        const result = await cancelRequestAction(requestId, user.id);

        if (result.success) {
            toast.success(result.message, { id: toastId });
            fetchRequests(); // Refresh list
        } else {
            toast.error(result.message, { id: toastId });
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'MATCHED': 'bg-blue-100 text-blue-800 border-blue-200',
            'APPROVED': 'bg-green-100 text-green-800 border-green-200',
            'REJECTED': 'bg-red-100 text-red-800 border-red-200',
            'RESCHEDULED': 'bg-purple-100 text-purple-800 border-purple-200',
            'COMPLETED': 'bg-gray-100 text-gray-800 border-gray-200',
            'CANCELLED': 'bg-gray-100 text-gray-600 border-gray-200',
        };

        const labels = {
            'PENDING': 'Beklemede',
            'MATCHED': 'Eşleştirildi',
            'APPROVED': 'Onaylandı',
            'REJECTED': 'Reddedildi',
            'RESCHEDULED': 'Yeni Tarih Önerildi',
            'COMPLETED': 'Tamamlandı',
            'CANCELLED': 'İptal Edildi',
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'}`}>
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    if (!user) {
        return (
            <div className="text-center py-12 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800">⚠️ Lütfen giriş yapın.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Talepler yükleniyor...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">Henüz talep oluşturmadınız</h3>
                <p className="mt-2 text-sm text-gray-500">Canlı Ders sayfasından eğitmen çağırabilirsiniz.</p>
                <a href="/live-request" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Eğitmen Çağır
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg font-semibold text-gray-900">{request.topic}</h3>
                                {getStatusBadge(request.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Eğitmen:</span>
                                    <span className="ml-2 font-medium text-gray-900">
                                        {request.instructorName || 'Atanmadı'}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-gray-500">Oluşturulma:</span>
                                    <span className="ml-2 text-gray-900">
                                        {new Date(request.createdAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>

                                {request.status === 'APPROVED' && request.scheduledDate && (
                                    <div className="md:col-span-2 bg-green-50 p-3 rounded-lg border border-green-200">
                                        <span className="text-green-800 font-medium">
                                            📅 Planlanan Ders: {new Date(request.scheduledDate + 'T' + request.scheduledTime).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                )}

                                {request.status === 'RESCHEDULED' && request.proposedDate && (
                                    <div className="md:col-span-2 bg-purple-50 p-3 rounded-lg border border-purple-200">
                                        <span className="text-purple-800 font-medium">
                                            💡 Önerilen Yeni Tarih: {new Date(request.proposedDate + 'T' + request.proposedTime).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                )}

                                {request.status === 'REJECTED' && request.rejectionReason && (
                                    <div className="md:col-span-2 bg-red-50 p-3 rounded-lg border border-red-200">
                                        <span className="text-red-800 text-sm">
                                            <strong>Ret Sebebi:</strong> {request.rejectionReason}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {(request.status === 'PENDING' || request.status === 'MATCHED' || request.status === 'RESCHEDULED') && (
                            <button
                                onClick={() => handleCancel(request.id)}
                                className="ml-4 px-3 py-1 text-sm font-medium text-red-700 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            >
                                İptal Et
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
