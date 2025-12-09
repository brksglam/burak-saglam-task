'use server';

import { db } from '@/lib/db';
import { LessonRequest } from '@/lib/types';

export async function getMyRequestsAction(userId: string) {
    try {
        const requests = db.lessonRequests.filter(r => r.userId === userId);

        // Sort by created date descending (newest first)
        const sortedRequests = requests.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return { success: true, requests: sortedRequests };
    } catch (error) {
        return { success: false, requests: [], message: 'Talepler getirilemedi.' };
    }
}

export async function cancelRequestAction(requestId: string, userId: string) {
    try {
        const request = db.lessonRequests.find(r => r.id === requestId);

        if (!request) {
            return { success: false, message: 'Talep bulunamadı.' };
        }

        if (request.userId !== userId) {
            return { success: false, message: 'Bu talebi iptal etme yetkiniz yok.' };
        }

        if (request.status === 'COMPLETED' || request.status === 'CANCELLED') {
            return { success: false, message: 'Bu talep zaten tamamlanmış veya iptal edilmiş.' };
        }

        const updatedRequest: LessonRequest = {
            ...request,
            status: 'CANCELLED'
        };

        db.updateLessonRequest(updatedRequest);

        return { success: true, message: 'Talep başarıyla iptal edildi.' };
    } catch (error) {
        return { success: false, message: 'Talep iptal edilemedi.' };
    }
}

export async function approveRescheduledTimeAction(requestId: string, userId: string) {
    try {
        const request = db.lessonRequests.find(r => r.id === requestId);

        if (!request) {
            return { success: false, message: 'Talep bulunamadı.' };
        }

        if (request.userId !== userId) {
            return { success: false, message: 'Bu işlemi yapma yetkiniz yok.' };
        }

        if (request.status !== 'RESCHEDULED') {
            return { success: false, message: 'Bu talep yeniden planlanmış durumda değil.' };
        }

        if (!request.proposedDate || !request.proposedTime) {
            return { success: false, message: 'Önerilen tarih bilgisi bulunamadı.' };
        }

        const updatedRequest: LessonRequest = {
            ...request,
            status: 'APPROVED',
            scheduledDate: request.proposedDate,
            scheduledTime: request.proposedTime,
            proposedDate: undefined,
            proposedTime: undefined
        };

        db.updateLessonRequest(updatedRequest);

        return { success: true, message: 'Yeni tarih onaylandı! Dersiniz planlandı.' };
    } catch (error) {
        return { success: false, message: 'Tarih onaylanamadı.' };
    }
}
