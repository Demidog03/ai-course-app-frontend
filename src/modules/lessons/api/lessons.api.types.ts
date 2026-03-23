export interface CreateLessonBody {
    title: string;
    courseId: number;
    content: string;
    orderIndex: number;
}

export interface GetLessonBody {
    lessonId: number;
    courseId: number;
}

export interface Lesson {
    id: string;
    courseId: string;
    title: string;
    content: Record<string, unknown>[];
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLessonResponse {
    lesson: Lesson;
}

export interface GetLessonResponse {
    lesson: Lesson;
}