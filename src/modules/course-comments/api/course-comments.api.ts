import {
    CourseComment,
    CreateCourseCommentDto,
    UpdateCourseCommentDto
} from "@/modules/course-comments/api/course-comments.types";
import {apiPrivate} from "@/shared/lib/api-private";

async function getCourseComments(courseId: number): Promise<CourseComment[]> {
    try {
        const response = await apiPrivate.get<{ data: CourseComment[] }>(`/courses/${courseId}/comments`)
        return response.data.data
    } catch (error) {
        console.error("Ошибка при получении комментариев курса: ", error)
        return []
    }
}

async function createCourseComment(courseId: number, body: CreateCourseCommentDto): Promise<CourseComment | null> {
    try {
        const response = await apiPrivate.post<CourseComment>(`/courses/${courseId}/comments`,
            body
        )
        return response.data
    } catch (error) {
        console.error("Ошибка при создании комментария: ", error)
        return null
    }
}

async function updateCourseComment(courseId: number, commentId: number, body: UpdateCourseCommentDto): Promise<CourseComment | null> {
    try {
        const response = await apiPrivate.put<CourseComment>(`/courses/${courseId}/comments/${commentId}`,
            body
        )
        return response.data
    } catch (error) {
        console.error("Ошибка при изменении комментария: ", error)
        return null
    }
}

async function deleteCourseComment(courseId: number, commentId: number): Promise<boolean> {
    try {
        await apiPrivate.delete(`/courses/${courseId}/comments/${commentId}`)
        return true
    } catch (error) {
        console.error("Ошибка при удалении комментария: ", error)
        return false
    }
}

const courseCommentsApi = {getCourseComments, createCourseComment, updateCourseComment, deleteCourseComment}

export default courseCommentsApi