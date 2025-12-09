'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Enrollment } from '@/lib/types';

export async function adminAssignCourseAction(userId: string, courseId: string) {
    // 1. Check if already enrolled
    if (db.hasEnrollment(userId, courseId)) {
        return { success: false, message: 'Kullanıcı bu eğitimi zaten almış.' };
    }

    // 2. Enroll User directly (Bypass payment)
    const newEnrollment: Enrollment = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        courseId,
        purchasedAt: new Date().toISOString()
    };

    db.addEnrollment(newEnrollment);

    // 3. Revalidate cache
    revalidatePath(`/courses/${courseId}`);
    revalidatePath('/courses');
    revalidatePath('/admin/dashboard');

    return { success: true, message: 'Eğitim başarıyla atandı.' };
}

export async function getAllRequestsAction() {
    try {
        const requests = db.lessonRequests.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return { success: true, requests };
    } catch (error) {
        return { success: false, requests: [] };
    }
}

export async function getAllEnrollmentsAction() {
    try {
        const enrollments = db.enrollments.map(enrollment => {
            const user = db.users.find(u => u.id === enrollment.userId);
            const course = db.courses.find(c => c.id === enrollment.courseId);

            return {
                ...enrollment,
                userName: user?.name || 'Unknown',
                userEmail: user?.email || '',
                courseTitle: course?.title || 'Unknown'
            };
        }).sort((a, b) =>
            new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime()
        );

        return { success: true, enrollments };
    } catch (error) {
        return { success: false, enrollments: [] };
    }
}
