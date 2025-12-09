import { db } from '@/lib/db';
import MyRequestsList from './requests-list';

export const dynamic = 'force-dynamic';

export default async function MyRequestsPage() {
    const requests = db.lessonRequests; // Will be fetched per user on client side

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Ders Taleplerim</h1>
                <p className="mt-2 text-gray-600">Oluşturduğunuz canlı ders taleplerini buradan takip edebilirsiniz.</p>
            </div>

            <MyRequestsList />
        </div>
    );
}
