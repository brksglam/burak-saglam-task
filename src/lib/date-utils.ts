/**
 * Format date safely for client-side rendering to avoid hydration mismatches
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    if (typeof window === 'undefined') {
        // Server-side: return a simple format to avoid timezone issues
        return new Date(date).toISOString().split('T')[0];
    }

    // Client-side: use full formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return new Date(date).toLocaleDateString('tr-TR', options || defaultOptions);
}

export function formatDateTime(dateStr: string, timeStr: string): string {
    if (typeof window === 'undefined') {
        return `${dateStr} ${timeStr}`;
    }

    try {
        const combined = new Date(`${dateStr}T${timeStr}`);
        return combined.toLocaleDateString('tr-TR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return `${dateStr} ${timeStr}`;
    }
}
