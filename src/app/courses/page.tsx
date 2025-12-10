import { db } from '@/lib/db';
import CourseCard from '@/components/course-card';

// Force dynamic
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
    const courses = db.courses;

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        📚 Tüm Eğitimler
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Size uygun kursu seçin ve öğrenmeye başlayın
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}
