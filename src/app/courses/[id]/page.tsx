import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BuyButton from './buy-button';

// Force dynamic
export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function CourseDetailPage(props: Props) {
    const params = await props.params;
    const course = db.courses.find((c) => c.id === params.id);

    if (!course) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-6 pb-16 sm:pb-24">
                <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div className="flex items-center">
                                <Link href="/courses" className="mr-4 text-sm font-medium text-gray-900 hover:text-gray-500">
                                    Eğitimler
                                </Link>
                                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {course.title}
                            </span>
                        </li>
                    </ol>
                </nav>

                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Image */}
                        <div className="aspect-w-1 aspect-h-1 w-full relative">
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="h-full w-full object-cover object-center rounded-lg sm:rounded-lg"
                            />
                        </div>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{course.title}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">₺{course.price}</p>
                            </div>

                            <div className="mt-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                    {course.category}
                                </span>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6 text-base text-gray-700">
                                    <p>{course.description}</p>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <p className="text-sm font-medium text-gray-500 mb-4">Eğitmen: {course.instructorName}</p>

                                <BuyButton course={course} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
