import { User } from "./types";

export const DEMO_USERS: User[] = [
    { id: 'u1', name: 'Ahmet Yılmaz', email: 'ahmet@demo.com', role: 'USER', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet' },
    { id: 'u2', name: 'Ayşe Demir', email: 'ayse@demo.com', role: 'USER', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse' },
    { id: 'i1', name: 'Dr. Zeynep Kaya', email: 'zeynep@demo.com', role: 'INSTRUCTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep' },
    { id: 'i2', name: 'Mehmet Öz', email: 'mehmet@demo.com', role: 'INSTRUCTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet' },
    { id: 'a1', "name": 'Admin User', email: 'admin@demo.com', role: 'ADMIN', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
];
