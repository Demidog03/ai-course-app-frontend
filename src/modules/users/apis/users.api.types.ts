export interface UserProfile {
    id: number
    fullName: string
    email: string
    createdAt: string
    updatedAt: string
    roleId: number
    role: UserRole
}

export interface UserRole {
    id: number
    name: UserRolesEnum,
    description: string
    createdAt: string
    updatedAt: string
}

export enum UserRolesEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
    AUTHOR = 'AUTHOR',
}