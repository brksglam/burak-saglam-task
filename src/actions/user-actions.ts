'use server';

import { db } from '@/lib/db';
import { Course } from '@/lib/types';

export async function getUserEnrollmentsAction(userId: string): Promise<Course[]> {
    const enrollments = db.enrollments.filter(e => e.userId === userId);
    const courseIds = enrollments.map(e => e.courseId);
    // Manual join
    const courses = db.courses.filter(c => courseIds.includes(c.id));
    return courses;
}
