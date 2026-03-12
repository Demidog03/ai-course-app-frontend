import {useQuery} from "@tanstack/react-query";
import {COURSES_QUERY_KEYS} from "@/modules/courses/queries/courses.query.types";
import coursesApi from "@/modules/courses/api/courses.api";

export default function useGetCoursesQuery() {
    return useQuery({
        queryKey: COURSES_QUERY_KEYS.all,
        queryFn: () => coursesApi.getCourses(),
    })
}