export const Roles = {
  STUDENT: 'STUDENT',
  TUTOR: 'TUTOR',
  SUPPORT: 'SUPPORT',
  ADMIN: 'ADMIN',
} as const;

export type Role = string; // 'STUDENT' | 'TUTOR' | 'SUPPORT' | 'ADMIN'

export const ProtectedPaths: Record<string, Role[]> = {
  '/student': ['STUDENT', 'ADMIN'],
  '/tutor': ['TUTOR', 'ADMIN'],
  '/support': ['SUPPORT', 'ADMIN'],
  '/admin': ['ADMIN'],
};
