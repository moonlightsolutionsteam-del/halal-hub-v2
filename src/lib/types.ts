

import type { Timestamp } from 'firebase/firestore';

export type UserRole = "consumer" | "business_owner" | "creator" | "field_team" | "admin" | "super_admin";

export interface UserProfile {
  uid: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  country: string;
  roles: UserRole[];
  halalCoinsBalance: number;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  photoURL?: string | null;
}

export type Department = "Engineering" | "Finance" | "Sales" | "HR" | "Marketing" | "Operations";

export type EmployeeStatus = "Active" | "On Probation" | "On Leave" | "Terminated";

export interface EmployeeProfile {
    employeeId: string;
    name: string;
    email: string;
    phone?: string;
    department: Department;
    role: string; // e.g., "Sales Executive", "Lead Developer"
    permissions: string[];
    joinDate: Timestamp;
    status: EmployeeStatus;
    photoURL?: string;
    zone?: string; // For field sales/ops
}

export interface Loyalty {
  userStamps: number;
  stampsRequired: number;
  rewardTitle: string;
  pointsPerStamp: number;
  completionBonus: number;
}

export interface Business {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    categoryId: string;
    type: string;
    category: string;
    cuisines?: string[];
    rating?: number;
    reviews?: number;
    distance?: string;
    verifiedHalal?: boolean;
    isOpen?: boolean;
    imageUrl?: string;
    imageHint?: string;
    nextPrayer?: string;
    nextPrayerTime?: string;
    amenities?: string[];
    loyalty?: Loyalty;
    priceRange?: string;
    specialties?: string[];
    verified?: boolean;
}
