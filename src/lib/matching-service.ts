import { db } from './db';
import { User } from './types';

export const MatchingService = {
    findInstructorForRequest: async (requestId: string, preferredInstructorId?: string): Promise<User | null> => {
        // Simulate searching algorithm delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Algorithm: If preferred is present, try to match that one. Else find first available.
        let matchedInstructor: User | undefined;

        if (preferredInstructorId) {
            matchedInstructor = db.users.find(u => u.id === preferredInstructorId && u.role === 'INSTRUCTOR');
        } else {
            matchedInstructor = db.users.find(u => u.role === 'INSTRUCTOR');
        }

        if (matchedInstructor) {
            // Update request status in DB
            const request = db.lessonRequests.find(r => r.id === requestId);
            if (request) {
                const updatedRequest = {
                    ...request,
                    status: 'MATCHED' as const,
                    instructorId: matchedInstructor.id,
                    instructorName: matchedInstructor.name
                };
                db.updateLessonRequest(updatedRequest);
            }
            return matchedInstructor;
        }

        return null;
    }
};
