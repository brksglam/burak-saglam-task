import Link from 'next/link';
import { Course } from '@/lib/types';

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div key={course.id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-48 relative">
                <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                        <Link href={`/courses/${course.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {course.title}
                        </Link>
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {course.category}
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-sm italic text-gray-500">Eğitmen: {course.instructorName}</p>
                    <p className="text-base font-medium text-gray-900 mt-2">₺{course.price}</p>
                </div>
            </div>
        </div>
    );
}
