'use server';

import { db } from '@/lib/db';
import { PaymentService } from '@/lib/payment-service';
import { revalidatePath } from 'next/cache';
import { Enrollment } from '@/lib/types';

export async function purchaseCourseAction(userId: string, courseId: string, price: number) {
    // 1. Check if already enrolled
    if (db.hasEnrollment(userId, courseId)) {
        return { success: false, message: 'Bu eğitimi zaten satın aldınız.' };
    }

    // 2. Process Payment
    const paymentResult = await PaymentService.processPayment(price, '4111****1234');

    if (!paymentResult.success) {
        return paymentResult;
    }

    // 3. Enroll User
    const newEnrollment: Enrollment = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        courseId,
        purchasedAt: new Date().toISOString()
    };

    db.addEnrollment(newEnrollment);

    // 4. Revalidate cache
    revalidatePath(`/courses/${courseId}`);
    revalidatePath('/courses');
    revalidatePath('/my-courses');

    return { success: true, message: 'Satın alma başarılı! Eğitime erişebilirsiniz.' };
}
