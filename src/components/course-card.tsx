import Link from 'next/link';
import { Course } from '@/lib/types';

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <Link href={`/courses/${course.id}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-glow">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {course.category}
                    </div>
                </div>

                {/* Course Info */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span>👨‍🏫</span>
                            <span>{course.instructorName}</span>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ₺{course.price.toFixed(2)}
                        </div>
                    </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </Link>
    );
}
