'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { LessonRequest } from '@/lib/types';

export async function getInstructorRequestsAction(instructorId: string) {
    try {
        const requests = db.lessonRequests.filter(
            r => r.instructorId === instructorId
        );

        // Sort: pending first, then by date
        const sortedRequests = requests.sort((a, b) => {
            if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
            if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        return { success: true, requests: sortedRequests };
    } catch (error) {
        return { success: false, requests: [] };
    }
}

export async function getInstructorStudentsAction(instructorId: string) {
    try {
        // Find all courses taught by this instructor
        const instructorCourses = db.courses.filter(c => c.instructorId === instructorId);
        const courseIds = instructorCourses.map(c => c.id);

        // Find all enrollments for these courses
        const enrollments = db.enrollments.filter(e => courseIds.includes(e.courseId));

        // Get unique user IDs 
        const studentIds = [...new Set(enrollments.map(e => e.userId))];

        // Get student details
        const students = db.users.filter(u => studentIds.includes(u.id));

        // Enrich with enrollment details
        const enrichedStudents = students.map(student => {
            const studentEnrollments = enrollments.filter(e => e.userId === student.id);
            const courses = studentEnrollments.map(enrollment => {
                const course = db.courses.find(c => c.id === enrollment.courseId);
                return {
                    courseId: enrollment.courseId,
                    courseTitle: course?.title || 'Unknown',
                    enrolledAt: enrollment.purchasedAt
                };
            });

            return {
                ...student,
                courses
            };
        });

        return { success: true, students: enrichedStudents };
    } catch (error) {
        return { success: false, students: [] };
    }
}

export async function approveRequestAction(
    requestId: string,
    instructorId: string,
    scheduledDate: string,
    scheduledTime: string,
    notes?: string
) {
    try {
        const request = db.lessonRequests.find(r => r.id === requestId);

        if (!request) {
            return { success: false, message: 'Talep bulunamadı.' };
        }

        if (request.instructorId !== instructorId) {
            return { success: false, message: 'Bu talebi onaylama yetkiniz yok.' };
        }

        const updatedRequest: LessonRequest = {
            ...request,
            status: 'APPROVED',
            scheduledDate,
            scheduledTime,
            notes
        };

        db.updateLessonRequest(updatedRequest);
        revalidatePath('/instructor/dashboard');

        return { success: true, message: 'Talep onaylandı ve tarih belirlendi.' };
    } catch (error) {
        return { success: false, message: 'Talep onaylanamadı.' };
    }
}

export async function rejectRequestAction(
    requestId: string,
    instructorId: string,
    rejectionReason: string
) {
    try {
        const request = db.lessonRequests.find(r => r.id === requestId);

        if (!request) {
            return { success: false, message: 'Talep bulunamadı.' };
        }

        if (request.instructorId !== instructorId) {
            return { success: false, message: 'Bu talebi reddetme yetkiniz yok.' };
        }

        const updatedRequest: LessonRequest = {
            ...request,
            status: 'REJECTED',
            rejectionReason
        };

        db.updateLessonRequest(updatedRequest);
        revalidatePath('/instructor/dashboard');

        return { success: true, message: 'Talep reddedildi.' };
    } catch (error) {
        return { success: false, message: 'Talep reddedilemedi.' };
    }
}

export async function proposeRescheduleAction(
    requestId: string,
    instructorId: string,
    proposedDate: string,
    proposedTime: string
) {
    try {
        const request = db.lessonRequests.find(r => r.id === requestId);

        if (!request) {
            return { success: false, message: 'Talep bulunamadı.' };
        }

        if (request.instructorId !== instructorId) {
            return { success: false, message: 'Bu talebi yeniden planma yetkiniz yok.' };
        }

        const updatedRequest: LessonRequest = {
            ...request,
            status: 'RESCHEDULED',
            proposedDate,
            proposedTime
        };

        db.updateLessonRequest(updatedRequest);
        revalidatePath('/instructor/dashboard');

        return { success: true, message: 'Yeni tarih önerildi.' };
    } catch (error) {
        return { success: false, message: 'Yeni tarih önerilemedi.' };
    }
}
