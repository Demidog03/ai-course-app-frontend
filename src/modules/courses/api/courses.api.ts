import {apiPrivate} from "@/lib/api-private";
import {
    GetCourseByIdResponse,
    GetCoursesResponse,
    UpdateCourseBody,
    UpdateCourseResponse
} from "@/modules/courses/api/courses.api.types";

async function getCourses(): Promise<GetCoursesResponse> {
    const response = await apiPrivate.get<GetCoursesResponse>('/courses')
    return response.data
}

async function getCourseById(id: string): Promise<GetCourseByIdResponse> {
    const response = await apiPrivate.get<GetCourseByIdResponse>(`/courses/${id}`)
    return response.data
}

async function getMyCourses(): Promise<GetCoursesResponse> {
    const response = await apiPrivate.get<GetCoursesResponse>(`/courses/my`)
    return response.data
}

async function updateCourse(id: string, body: UpdateCourseBody): Promise<UpdateCourseResponse> {
    const response = await apiPrivate.put<UpdateCourseResponse>(`/courses/${id}`, body)
    return response.data
}

const coursesApi = { getCourses, getCourseById, getMyCourses, updateCourse }

export default coursesApi