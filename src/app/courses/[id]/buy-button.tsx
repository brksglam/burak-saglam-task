'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { purchaseCourseAction } from '@/actions/course-actions';
import { Course } from '@/lib/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function BuyButton({ course }: { course: Course }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const router = useRouter();

    const handleInitialClick = () => {
        if (!user) {
            toast.error('Lütfen önce giriş yapın (Demo hesaplardan birine tıklayın).');
            return;
        }

        if (user.role !== 'USER') {
            toast.error('Sadece öğrenci rolü ile satın alma yapabilirsiniz.');
            return;
        }
        setShowPaymentForm(true);
    };

    const isValidLuhn = (val: string) => {
        let checksum = 0;
        let j = 1;
        for (let i = val.length - 1; i >= 0; i--) {
            let calc = 0;
            calc = Number(val.charAt(i)) * j;
            if (calc > 9) {
                checksum = checksum + 1;
                calc = calc - 10;
            }
            checksum = checksum + calc;
            if (j == 1) { j = 2 } else { j = 1 };
        }
        return (checksum % 10) == 0;
    };

    const handlePurchase = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validations
        if (cardNumber.length !== 16) {
            toast.error('Kart numarası 16 haneli olmalıdır.');
            return;
        }

        if (!isValidLuhn(cardNumber)) {
            toast.error('Geçersiz kart numarası! (Luhn kontrolü başarısız)');
            return;
        }

        if (!expiry || expiry.length !== 5 || !expiry.includes('/')) {
            toast.error('Son kullanma tarihi geçersiz. (örn: 12/25)');
            return;
        }

        if (!cvv || cvv.length !== 3) {
            toast.error('CVV 3 haneli olmalıdır.');
            return;
        }

        if (!user) {
            toast.error('Oturum süreniz dolmuş olabilir.');
            return;
        }

        // Process
        const toastId = toast.loading('Ödeme güvenli bir şekilde işleniyor...');
        setLoading(true);

        try {
            // Simulate network delay for better UX feel
            await new Promise(resolve => setTimeout(resolve, 1500));

            const result = await purchaseCourseAction(user.id, course.id, course.price);

            if (result.success) {
                toast.success(`Başarılı! ${result.message}`, { id: toastId });
                setShowPaymentForm(false);
                router.push('/my-courses');
                router.refresh();
            } else {
                toast.error(result.message, { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error('Bir hata oluştu. Lütfen tekrar deneyin.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    if (showPaymentForm) {
        return (
            <form onSubmit={handlePurchase} className="mt-4 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Güvenli Ödeme
                </h3>

                {/* Card Number */}
                <div className="mb-4">
                    <label htmlFor="card-number" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Kart Numarası</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                setCardNumber(val);
                            }}
                            placeholder="4111 1111 1111 1111"
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 tracking-widest font-mono"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M2 7h20v2H2z" opacity=".3" /><path d="M2 11h20v9H2z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Expiry & CVV */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label htmlFor="expiry" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">SKT (MM/YY)</label>
                        <input
                            type="text"
                            id="expiry"
                            value={expiry}
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.length >= 2) {
                                    val = val.slice(0, 2) + '/' + val.slice(2, 4);
                                }
                                setExpiry(val);
                            }}
                            maxLength={5}
                            placeholder="12/25"
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 text-center font-mono"
                        />
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="cvv" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            placeholder="123"
                            maxLength={3}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 text-center font-mono"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 flex items-center justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-md'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                İşleniyor...
                            </span>
                        ) : `Öde ve Kaydol (₺${course.price})`}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowPaymentForm(false)}
                        disabled={loading}
                        className="flex-shrink-0 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:text-gray-900 transition-colors"
                    >
                        İptal
                    </button>
                </div>
                <p className="mt-4 text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    Bu bir demo ödeme simülasyonudur. Gerçek para çekilmez.
                </p>
            </form>
        );
    }

    return (
        <button
            onClick={handleInitialClick}
            className="w-full flex items-center justify-center rounded-xl border border-transparent px-8 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
        >
            Hemen Satın Al (₺{course.price})
        </button>
    );
}
