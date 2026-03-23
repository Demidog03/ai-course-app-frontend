import {
    CreateLessonBody,
    CreateLessonResponse,
    GetLessonBody,
    GetLessonResponse
} from "@/modules/lessons/api/lessons.api.types";
import {apiPrivate} from "@/lib/api-private";

async function createLesson(body: CreateLessonBody): Promise<CreateLessonResponse> {
    const response = await apiPrivate.post<CreateLessonResponse>(`/courses/${body.courseId}/lessons`, {
        title: body.title,
        content: body.content,
        orderIndex: body.orderIndex,
    })

    return response.data
}

async function getLesson(body: GetLessonBody): Promise<GetLessonResponse> {
    const response = await apiPrivate.get<GetLessonResponse>(`/courses/${body.courseId}/lessons/${body.lessonId}`)
    return response.data
}

const lessonsApi = { createLesson, getLesson }

export default lessonsApi