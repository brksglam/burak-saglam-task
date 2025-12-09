'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getInstructorStudentsAction } from '@/actions/instructor-actions';

interface EnrichedStudent {
    id: string;
    name: string;
    email: string;
    courses: {
        courseId: string;
        courseTitle: string;
        enrolledAt: string;
    }[];
}

export default function InstructorStudentsView() {
    const { user } = useAuth();
    const [students, setStudents] = useState<EnrichedStudent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            if (!user || user.role !== 'INSTRUCTOR') return;

            setLoading(true);
            const result = await getInstructorStudentsAction(user.id);
            if (result.success) {
                setStudents(result.students);
            }
            setLoading(false);
        };

        fetchStudents();
    }, [user]);

    if (!user || user.role !== 'INSTRUCTOR') {
        return null;
    }

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-600">Henüz öğrenciniz bulunmuyor.</p>
                <p className="text-sm text-gray-500 mt-1">Eğitimlerinizi satın alan öğrenciler burada görünecektir.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="divide-y divide-gray-200">
                {students.map((student) => (
                    <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{student.email}</p>

                                <div className="mt-4">
                                    <p className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                                        Kayıtlı Eğitimler ({student.courses.length})
                                    </p>
                                    <div className="space-y-2">
                                        {student.courses.map((course, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                                <span className="text-sm text-gray-900">{course.courseTitle}</span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(course.enrolledAt).toLocaleDateString('tr-TR')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
