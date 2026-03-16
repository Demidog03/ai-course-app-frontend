import {apiPrivate} from "@/lib/api-private";
import {GetCourseByIdResponse, GetCoursesResponse} from "@/modules/courses/api/courses.api.types";

async function getCourses(): Promise<GetCoursesResponse> {
    const response = await apiPrivate.get<GetCoursesResponse>('/courses')
    return response.data
}

async function getCourseById(id: string): Promise<GetCourseByIdResponse> {
    const response = await apiPrivate.get<GetCourseByIdResponse>(`/courses/${id}`)
    return response.data
}

const coursesApi = { getCourses, getCourseById }

export default coursesApi