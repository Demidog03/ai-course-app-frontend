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
    lessons: Lesson[]
}

export interface GetCourseByIdResponse {
    course: Course
}

export interface UpdateCourseResponse {
    course: Course
}

export type UpdateCourseBody = FormData

export interface Lesson {
    id: number
    courseId: number
    title: string
    content: Record<string, unknown>[],
    orderIndex: number
    createdAt: string
    updatedAt: string
}