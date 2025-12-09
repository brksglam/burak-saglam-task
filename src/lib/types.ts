export type Role = 'USER' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl?: string; // Optional for UI simulation
}

export interface Course {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    instructorName: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    purchasedAt: string; // ISO Date string
}

export type LessonRequestStatus =
    | 'PENDING'        // Initial state - waiting for instructor
    | 'MATCHED'        // Instructor found but not yet approved
    | 'APPROVED'       // Instructor approved with date/time
    | 'REJECTED'       // Instructor rejected
    | 'RESCHEDULED'    // Instructor proposed new time
    | 'COMPLETED'      // Lesson finished
    | 'CANCELLED';     // Student cancelled

export interface LessonRequest {
    id: string;
    userId: string;
    userName?: string;
    topic: string;
    status: LessonRequestStatus;
    instructorId?: string;
    instructorName?: string;
    createdAt: string; // ISO Date string

    // Scheduling fields
    scheduledDate?: string;      // YYYY-MM-DD format
    scheduledTime?: string;      // HH:MM format (24h)
    proposedDate?: string;       // For RESCHEDULED status
    proposedTime?: string;       // For RESCHEDULED status

    // Additional metadata
    rejectionReason?: string;    // Why instructor rejected
    notes?: string;              // General notes
}
