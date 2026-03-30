'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import {Button, Flex, Paper, Title} from "@mantine/core";
import useGetLessonQuery from "@/modules/lessons/queries/useGetLessonQuery";
import {useParams, useRouter} from "next/navigation";
import LessonRenderer from "@/modules/lessons/ui/LessonRenderer";
import {IconArrowLeft, IconEdit} from "@tabler/icons-react";
import useCheckIfEditable from "@/shared/hooks/useCheckIfEditable";
import useGetCourseByIdQuery from "@/modules/courses/queries/useGetCourseByIdQuery";
import AITutorWrapper from "@/modules/ai-tutor/ui/AITutorWrapper";

function Page() {
    const params = useParams()
    const router = useRouter()
    const courseId = Number(params.id)
    const lessonId = Number(params.lesson_id)

    const { data: lessonData } = useGetLessonQuery({ courseId, lessonId })
    const { data: courseData } = useGetCourseByIdQuery(courseId.toString())
    const lesson = lessonData?.lesson
    const course = courseData?.course

    const { status: isEditable } = useCheckIfEditable(course?.authorId)

    function openLessonEditPage() {
        if (courseId && lessonId) {
            router.push(`/courses/${courseId}/lessons/${lessonId}/edit`)
        }
    }

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <Flex justify="space-between" mt="md" gap="md">
                    <Button
                        variant="subtle"
                        color="gray"
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={() => router.back()}
                        mb="md"
                    >
                        Вернуться
                    </Button>
                    {isEditable && (
                        <Button
                            variant="light"
                            color="yellow"
                            leftSection={<IconEdit size={16} />}
                            onClick={openLessonEditPage}
                            mb="md"
                        >
                            Редактировать
                        </Button>
                    )}
                </Flex>
                <Paper withBorder shadow="sm" p={30} radius="md">
                    <Title order={1} mb="md">
                        {lesson?.title ?? 'Урок'}
                    </Title>

                    <AITutorWrapper>
                        <LessonRenderer content={lesson?.content} />
                    </AITutorWrapper>
                </Paper>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default Page;