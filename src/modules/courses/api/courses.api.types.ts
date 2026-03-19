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
    authorId: number
}

export interface GetCourseByIdResponse {
    course: Course
}

export interface UpdateCourseResponse {
    course: Course
}

export interface UpdateCourseBody {
    title: string
    description: string
    isPublished: boolean
}