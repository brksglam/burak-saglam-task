import { db } from '@/lib/db';
import InstructorRequestsManager from './requests-manager';
import InstructorStudentsView from './students-view';

export const dynamic = 'force-dynamic';

export default async function InstructorDashboard() {
    // Get stats
    const allRequests = db.lessonRequests;
    const allStudents = db.users.filter(u => u.role === 'USER');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Eğitmen Paneli</h1>
                <p className="mt-2 text-gray-600">Ders taleplerinizi yönetin ve öğrencilerinizi görüntüleyin.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Toplam Öğrenci</dt>
                                    <dd className="text-lg font-semibold text-gray-900">{allStudents.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Bekleyen Talepler</dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {allRequests.filter(r => r.status === 'PENDING' || r.status === 'MATCHED').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Onaylanmış Dersler</dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {allRequests.filter(r => r.status === 'APPROVED').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson Requests Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ders Talepleri</h2>
                <InstructorRequestsManager />
            </div>

            {/* Students Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Öğrencilerim</h2>
                <InstructorStudentsView />
            </div>
        </div>
    );
}
