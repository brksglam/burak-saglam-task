'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getInstructorRequestsAction, approveRequestAction, rejectRequestAction, proposeRescheduleAction } from '@/actions/instructor-actions';
import { LessonRequest } from '@/lib/types';
import toast from 'react-hot-toast';

export default function InstructorRequestsManager() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<LessonRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<{ type: 'approve' | 'reject' | 'reschedule', requestId: string } | null>(null);

    // Form states
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [notes, setNotes] = useState('');

    const fetchRequests = async () => {
        if (!user || user.role !== 'INSTRUCTOR') return;

        setLoading(true);
        const result = await getInstructorRequestsAction(user.id);
        if (result.success) {
            setRequests(result.requests);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, [user]);

    const handleApprove = async () => {
        if (!user || !activeModal) return;

        if (!scheduledDate || !scheduledTime) {
            toast.error('Lütfen tarih ve saat seçiniz.');
            return;
        }

        const toastId = toast.loading('onaylanıyor...');
        const result = await approveRequestAction(
            activeModal.requestId,
            user.id,
            scheduledDate,
            scheduledTime,
            notes
        );

        if (result.success) {
            toast.success(result.message, { id: toastId });
            setActiveModal(null);
            resetForm();
            fetchRequests();
        } else {
            toast.error(result.message, { id: toastId });
        }
    };

    const handleReject = async () => {
        if (!user || !activeModal) return;

        if (!rejectionReason.trim()) {
            toast.error('Lütfen ret sebebini giriniz.');
            return;
        }

        const toastId = toast.loading('Reddediliyor...');
        const result = await rejectRequestAction(
            activeModal.requestId,
            user.id,
            rejectionReason
        );

        if (result.success) {
            toast.success(result.message, { id: toastId });
            setActiveModal(null);
            resetForm();
            fetchRequests();
        } else {
            toast.error(result.message, { id: toastId });
        }
    };

    const handleReschedule = async () => {
        if (!user || !activeModal) return;

        if (!scheduledDate || !scheduledTime) {
            toast.error('Lütfen yeni tarih ve saat seçiniz.');
            return;
        }

        const toastId = toast.loading('Yeni tarih öneriliyor...');
        const result = await proposeRescheduleAction(
            activeModal.requestId,
            user.id,
            scheduledDate,
            scheduledTime
        );

        if (result.success) {
            toast.success(result.message, { id: toastId });
            setActiveModal(null);
            resetForm();
            fetchRequests();
        } else {
            toast.error(result.message, { id: toastId });
        }
    };

    const resetForm = () => {
        setScheduledDate('');
        setScheduledTime('');
        setRejectionReason('');
        setNotes('');
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'MATCHED': 'bg-blue-100 text-blue-800',
            'APPROVED': 'bg-green-100 text-green-800',
            'REJECTED': 'bg-red-100 text-red-800',
            'RESCHEDULED': 'bg-purple-100 text-purple-800',
            'COMPLETED': 'bg-gray-100 text-gray-800',
            'CANCELLED': 'bg-gray-100 text-gray-600',
        };

        const labels = {
            'PENDING': 'Yeni',
            'MATCHED': 'Eşleşti',
            'APPROVED': 'Onaylandı',
            'REJECTED': 'Reddedildi',
            'RESCHEDULED': 'Yeniden Planlandı',
            'COMPLETED': 'Tamamlandı',
            'CANCELLED': 'İptal',
        };

        return (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    if (!user || user.role !== 'INSTRUCTOR') {
        return <div className="text-center py-8 text-gray-600">Sadece eğitmenler bu sayfayı görüntüleyebilir.</div>;
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const pendingRequests = requests.filter(r => r.status === 'PENDING' || r.status === 'MATCHED');
    const otherRequests = requests.filter(r => r.status !== 'PENDING' && r.status !== 'MATCHED');

    return (
        <>
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm mr-2">{pendingRequests.length}</span>
                        Bekleyen Talepler
                    </h3>
                    <div className="space-y-4">
                        {pendingRequests.map(request => (
                            <div key={request.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="text-lg font-semibold text-gray-900">{request.topic}</h4>
                                            {getStatusBadge(request.status)}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Öğrenci: <span className="font-medium">{request.userName}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(request.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveModal({ type: 'approve', requestId: request.id })}
                                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors"
                                    >
                                        ✓ Onayla
                                    </button>
                                    <button
                                        onClick={() => setActiveModal({ type: 'reschedule', requestId: request.id })}
                                        className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium transition-colors"
                                    >
                                        📅 Farklı Tarih Öner
                                    </button>
                                    <button
                                        onClick={() => setActiveModal({ type: 'reject', requestId: request.id })}
                                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium transition-colors"
                                    >
                                        ✗ Reddet
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Requests */}
            {otherRequests.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Geçmiş Talepler</h3>
                    <div className="space-y-3">
                        {otherRequests.map(request => (
                            <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{request.topic}</span>
                                            {getStatusBadge(request.status)}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{request.userName}</p>
                                        {request.status === 'APPROVED' && request.scheduledDate && (
                                            <p className="text-sm text-green-700 mt-1">
                                                📅 {new Date(request.scheduledDate + 'T' + request.scheduledTime).toLocaleString('tr-TR')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {requests.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600">Henüz talep bulunmuyor.</p>
                </div>
            )}

            {/* Modal for Actions */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {activeModal.type === 'approve' && 'Talebi Onayla'}
                            {activeModal.type === 'reject' && 'Talebi Reddet'}
                            {activeModal.type === 'reschedule' && 'Yeni Tarih Öner'}
                        </h3>

                        {(activeModal.type === 'approve' || activeModal.type === 'reschedule') && (
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                                    <input
                                        type="date"
                                        value={scheduledDate}
                                        onChange={e => setScheduledDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Saat</label>
                                    <input
                                        type="time"
                                        value={scheduledTime}
                                        onChange={e => setScheduledTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                {activeModal.type === 'approve' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notlar (Opsiyonel)</label>
                                        <textarea
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Ders ile ilgili  notlarınız..."
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {activeModal.type === 'reject' && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ret Sebebi</label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={e => setRejectionReason(e.target.value)}
                                    rows={4}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Lütfen ret sebebinizi açıklayın..."
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setActiveModal(null);
                                    resetForm();
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                            >
                                İptal
                            </button>
                            <button
                                onClick={() => {
                                    if (activeModal.type === 'approve') handleApprove();
                                    if (activeModal.type === 'reject') handleReject();
                                    if (activeModal.type === 'reschedule') handleReschedule();
                                }}
                                className={`flex-1 px-4 py-2 rounded-lg text-white font-medium ${activeModal.type === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                    activeModal.type === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                                        'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                {activeModal.type === 'approve' && 'Onayla'}
                                {activeModal.type === 'reject' && 'Reddet'}
                                {activeModal.type === 'reschedule' && 'Öner'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
