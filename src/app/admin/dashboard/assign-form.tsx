'use client';

import { useState } from 'react';
import { adminAssignCourseAction } from '@/actions/admin-actions';
import { User, Course } from '@/lib/types';
import toast from 'react-hot-toast';

interface Props {
    users: User[];
    courses: Course[];
}

export default function AdminAssignForm({ users, courses }: Props) {
    const [selectedUser, setSelectedUser] = useState(users[0]?.id || '');
    const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || '');
    const [loading, setLoading] = useState(false);

    const handleAssign = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Atama yapılıyor...');

        try {
            const result = await adminAssignCourseAction(selectedUser, selectedCourse);
            if (result.success) {
                toast.success(result.message, { id: toastId });
            } else {
                toast.error(result.message, { id: toastId });
            }
        } catch (error) {
            toast.error('Hata oluştu.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAssign} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-end">
            <div>
                <label className="block text-sm font-medium text-gray-700">Kullanıcı Seç</label>
                <select
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
                >
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Eğitim Seç</label>
                <select
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
                >
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? 'Atanıyor...' : 'Eğitimi Ata'}
            </button>
        </form>
    );
}
