export type UserRole = 'Admin' | 'Manager' | 'Analyst';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  avatar: string;
  joinedAt: string;
}

export const appUsers: AppUser[] = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@ptchdeck.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago', avatar: 'PS', joinedAt: '2023-01-15' },
  { id: 'u2', name: 'James Wu', email: 'james@ptchdeck.com', role: 'Manager', status: 'Active', lastActive: '5 hours ago', avatar: 'JW', joinedAt: '2023-03-08' },
  { id: 'u3', name: 'Ananya Rao', email: 'ananya@ptchdeck.com', role: 'Analyst', status: 'Active', lastActive: '1 day ago', avatar: 'AR', joinedAt: '2023-06-22' },
  { id: 'u4', name: 'Meera Patel', email: 'meera@ptchdeck.com', role: 'Analyst', status: 'Active', lastActive: '3 days ago', avatar: 'MP', joinedAt: '2024-01-10' },
  { id: 'u5', name: 'Carlos Rivera', email: 'carlos@ptchdeck.com', role: 'Analyst', status: 'Inactive', lastActive: '2 weeks ago', avatar: 'CR', joinedAt: '2023-09-14' },
  { id: 'u6', name: 'Sofia Lindqvist', email: 'sofia@ptchdeck.com', role: 'Manager', status: 'Active', lastActive: '6 hours ago', avatar: 'SL', joinedAt: '2023-11-30' },
  { id: 'u7', name: 'Kenji Tanaka', email: 'kenji@ptchdeck.com', role: 'Analyst', status: 'Pending', lastActive: 'Never', avatar: 'KT', joinedAt: '2025-03-20' },
];
