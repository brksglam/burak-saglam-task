import { db } from '@/lib/db';
import LiveRequestForm from './request-form';

export const dynamic = 'force-dynamic';

export default async function LiveRequestPage() {
    const instructors = db.users.filter(u => u.role === 'INSTRUCTOR');

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <LiveRequestForm instructors={instructors} />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h3 className="font-semibold text-gray-900">Hızlı Eşleşme</h3>
                    <p className="text-xs text-gray-500 mt-1">Ortalama 2 dakika içinde bağlanın.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <h3 className="font-semibold text-gray-900">Uzman Eğitmenler</h3>
                    <p className="text-xs text-gray-500 mt-1">Alanında onaylanmış profesyoneller.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-3xl mb-2">📹</div>
                    <h3 className="font-semibold text-gray-900">HD Görüntü</h3>
                    <p className="text-xs text-gray-500 mt-1">Kesintisiz ve yüksek kaliteli yayın.</p>
                </div>
            </div>
        </div>
    );
}
