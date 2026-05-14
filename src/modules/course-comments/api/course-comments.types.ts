export interface CourseComment {
    id: number;
    courseId: number;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        fullName: string;
    }
}
export interface CreateCourseCommentDto {
    content: string;
}
export interface UpdateCourseCommentDto {
    content: string;
}