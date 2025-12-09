import fs from 'fs';
import path from 'path';
import { User, Course, Enrollment, LessonRequest } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

interface DBSchema {
    users: User[];
    courses: Course[];
    enrollments: Enrollment[];
    lessonRequests: LessonRequest[];
}

function readDB(): DBSchema {
    if (!fs.existsSync(DB_PATH)) {
        // Return empty structure if file doesn't exist
        return { users: [], courses: [], enrollments: [], lessonRequests: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

function writeDB(data: DBSchema) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helper to provide data access
export const db = {
    get users() { return readDB().users; },
    get courses() { return readDB().courses; },
    get enrollments() { return readDB().enrollments; },
    get lessonRequests() { return readDB().lessonRequests; },

    getUserByEmail: (email: string) => {
        return readDB().users.find(u => u.email === email);
    },

    addEnrollment: (enrollment: Enrollment) => {
        const data = readDB();
        data.enrollments.push(enrollment);
        writeDB(data);
        return enrollment;
    },

    hasEnrollment: (userId: string, courseId: string) => {
        return readDB().enrollments.some(e => e.userId === userId && e.courseId === courseId);
    },

    addLessonRequest: (request: LessonRequest) => {
        const data = readDB();
        data.lessonRequests.push(request);
        writeDB(data);
        return request;
    },

    updateLessonRequest: (request: LessonRequest) => {
        const data = readDB();
        const index = data.lessonRequests.findIndex(r => r.id === request.id);
        if (index !== -1) {
            data.lessonRequests[index] = request;
            writeDB(data);
        }
    }
};
