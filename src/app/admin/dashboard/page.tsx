import { db } from '@/lib/db';
import AdminAssignForm from './assign-form';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const users = db.users.filter(u => u.role === 'USER');
    const courses = db.courses;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Paneli</h1>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Hızlı Eğitim Atama</h2>
                <p className="text-gray-600 mb-6 text-sm">Demo amaçlı olarak bir kullanıcıya direkt eğitim tanımlayabilirsiniz.</p>

                <AdminAssignForm users={users} courses={courses} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Sistem Durumu</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Toplam Kullanıcı</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{db.users.length}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Toplam Satış</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{db.enrollments.length}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Bekleyen Ders Talebi</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{db.lessonRequests.filter(r => r.status === 'PENDING').length}</dd>
                    </div>
                </div>
            </div>
        </div>
    );
}
