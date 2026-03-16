export const COURSES_QUERY_PREFIX = 'courses';

export const COURSES_QUERY_KEYS = {
    all: [COURSES_QUERY_PREFIX, 'all'],
    getById: (id: string) => [COURSES_QUERY_PREFIX, id],
}