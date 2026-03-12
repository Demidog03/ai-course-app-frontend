import {apiPrivate} from "@/lib/api-private";
import {GetCoursesResponse} from "@/modules/courses/api/courses.api.types";

async function getCourses(): Promise<GetCoursesResponse> {
    const response = await apiPrivate.get<GetCoursesResponse>('/courses')
    return response.data
}

const coursesApi = { getCourses }

export default coursesApi