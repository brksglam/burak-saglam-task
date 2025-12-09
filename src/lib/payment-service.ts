export const PaymentService = {
    processPayment: async (amount: number, cardNumber: string): Promise<{ success: boolean; message: string }> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random failure (10% chance)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            console.log(`Payment of ₺${amount} successful with card ending in ${cardNumber.slice(-4)}`);
            return { success: true, message: 'Ödeme başarıyla alındı.' };
        } else {
            console.error('Payment failed');
            return { success: false, message: 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' };
        }
    }
};
