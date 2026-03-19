export const COURSES_QUERY_PREFIX = 'courses';

export const COURSES_QUERY_KEYS = {
    all: [COURSES_QUERY_PREFIX, 'all'],
    getMy: [COURSES_QUERY_PREFIX, 'getMy'],
    getById: (id: string) => [COURSES_QUERY_PREFIX, id],
    update: [COURSES_QUERY_PREFIX, 'update'],
}