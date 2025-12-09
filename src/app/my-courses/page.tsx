'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getUserEnrollmentsAction } from '@/actions/user-actions';
import { Course } from '@/lib/types';
import CourseCard from '@/components/course-card';
import Link from 'next/link';

export default function MyCoursesPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getUserEnrollmentsAction(user.id)
                .then(setCourses)
                .finally(() => setLoading(false));
        } else {
            setCourses([]);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Lütfen Giriş Yapın</h2>
                <p className="mt-2 text-gray-500">Kurslarınızı görmek için giriş yapmalısınız.</p>
                <div className="mt-6">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">Anasayfa'ya Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Satın Aldığım Eğitimler</h2>

                {loading ? (
                    <p className="mt-4 text-gray-500">Yükleniyor...</p>
                ) : courses.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 text-center">
                        <p className="text-gray-500">Henüz hiç eğitim satın almadınız.</p>
                        <Link href="/courses" className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-500">
                            Eğitimleri İncele &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
