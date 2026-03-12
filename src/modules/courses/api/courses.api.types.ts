export interface GetCoursesResponse {
    courses: Course[]
}

export interface Course {
    id: number
    title: string
    description: string
    isPublished: boolean
    createdAt: string
    updatedAt: string
}