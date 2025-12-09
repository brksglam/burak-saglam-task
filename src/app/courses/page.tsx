import { db } from '@/lib/db';
import CourseCard from '@/components/course-card';

// Force dynamic
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
    const courses = db.courses;

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Tüm Eğitimler</h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}
