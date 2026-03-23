import {GetLessonBody} from "@/modules/lessons/api/lessons.api.types";

export const LESSONS_QUERY_PREFIX = 'lessons';

export const LESSONS_QUERY_KEYS = {
   create: [LESSONS_QUERY_PREFIX, 'create'],
   get: (body: GetLessonBody) => [LESSONS_QUERY_PREFIX, 'get', body.courseId, body.lessonId],
}