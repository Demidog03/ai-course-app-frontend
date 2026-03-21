export interface GetCoursesResponse {
    courses: Course[]
}

export interface Course {
    id: number
    title: string
    description: string
    coverImage: string | null
    isPublished: boolean
    createdAt: string
    updatedAt: string
    authorId: number
}

export interface GetCourseByIdResponse {
    course: Course
}

export interface UpdateCourseResponse {
    course: Course
}

export type UpdateCourseBody = FormData