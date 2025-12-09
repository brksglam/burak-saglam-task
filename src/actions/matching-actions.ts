'use server';

import { db } from '@/lib/db';
import { MatchingService } from '@/lib/matching-service';
import { revalidatePath } from 'next/cache';
import { LessonRequest } from '@/lib/types';

export async function requestLessonAction(userId: string, topic: string, instructorId?: string) {
    const user = db.users.find(u => u.id === userId);
    // 1. Create Request
    const newRequest: LessonRequest = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        userName: user?.name,
        topic,
        status: 'PENDING',
        instructorId: instructorId, // Optional pre-assignment
        createdAt: new Date().toISOString()
    };

    db.addLessonRequest(newRequest);

    // 2. Trigger Matching Simulation
    try {
        const matchedInstructor = await MatchingService.findInstructorForRequest(newRequest.id, instructorId);

        if (matchedInstructor) {
            revalidatePath('/live-request');
            revalidatePath('/instructor/dashboard');
            return {
                success: true,
                message: `Eşleşme Başarılı! Eğitmeniniz: ${matchedInstructor.name}`,
                match: matchedInstructor
            };
        } else {
            // If we requested a specific one but they are "busy" or not found (mock logic)
            revalidatePath('/live-request');
            revalidatePath('/instructor/dashboard');
            return {
                success: true,
                message: instructorId
                    ? 'Seçtiğiniz eğitmene bildirim gönderildi. Yanıt bekleniyor.'
                    : 'Talebiniz alındı. Eğitmen aranıyor...',
                pending: true
            };
        }

    } catch (error) {
        return { success: false, message: 'Eşleştirme hatası occurred.' };
    }
}
