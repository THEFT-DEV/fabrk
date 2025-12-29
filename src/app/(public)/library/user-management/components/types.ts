/**
 * Type definitions and mock data for user management
 */

// User type definition
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  status: 'active' | 'inactive' | 'suspended';
  plan: 'Free' | 'Pro' | 'Enterprise';
  createdAt: string;
  lastLogin: string;
};

// Mock data - replace with your API
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'ADMIN',
    status: 'active',
    plan: 'Enterprise',
    createdAt: '2024-01-15',
    lastLogin: '2024-11-10 14:23',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'USER',
    status: 'active',
    plan: 'Pro',
    createdAt: '2024-02-20',
    lastLogin: '2024-11-09 09:15',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'USER',
    status: 'inactive',
    plan: 'Free',
    createdAt: '2024-03-10',
    lastLogin: '2024-10-28 16:45',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'GUEST',
    status: 'active',
    plan: 'Free',
    createdAt: '2024-04-05',
    lastLogin: '2024-11-11 11:30',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    role: 'USER',
    status: 'suspended',
    plan: 'Pro',
    createdAt: '2024-05-12',
    lastLogin: '2024-09-15 08:20',
  },
  {
    id: '6',
    name: 'David Martinez',
    email: 'david@example.com',
    role: 'ADMIN',
    status: 'active',
    plan: 'Enterprise',
    createdAt: '2024-01-08',
    lastLogin: '2024-11-11 15:10',
  },
  {
    id: '7',
    name: 'Jessica Taylor',
    email: 'jessica@example.com',
    role: 'USER',
    status: 'active',
    plan: 'Pro',
    createdAt: '2024-06-22',
    lastLogin: '2024-11-10 12:05',
  },
  {
    id: '8',
    name: 'Robert Brown',
    email: 'robert@example.com',
    role: 'USER',
    status: 'inactive',
    plan: 'Free',
    createdAt: '2024-07-18',
    lastLogin: '2024-08-30 19:40',
  },
  {
    id: '9',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'USER',
    status: 'active',
    plan: 'Enterprise',
    createdAt: '2024-02-28',
    lastLogin: '2024-11-11 10:25',
  },
  {
    id: '10',
    name: 'Thomas Lee',
    email: 'thomas@example.com',
    role: 'GUEST',
    status: 'active',
    plan: 'Free',
    createdAt: '2024-08-05',
    lastLogin: '2024-11-08 14:55',
  },
];
