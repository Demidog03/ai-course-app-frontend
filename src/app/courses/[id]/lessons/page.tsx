'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import useGetCourseByIdQuery from "@/modules/courses/queries/useGetCourseByIdQuery";
import {useParams, useRouter} from "next/navigation";
import {Badge, Button, Card, Flex, Group, Title} from "@mantine/core";
import classes from "./lessons.module.css";
import {IconArrowLeft} from "@tabler/icons-react";
import useCheckIfEditable from "@/shared/hooks/useCheckIfEditable";

function LessonsPage() {
    const router = useRouter()
    const params = useParams()
    const courseId = params.id as string

    const { data: courseData } = useGetCourseByIdQuery(courseId || '')
    const course = courseData?.course
    const lessons = course?.lessons ?? []

    const { status: isEditable } = useCheckIfEditable(course?.authorId)

    function openLessonPage(lessonId: number) {
        if (lessonId && courseId) {
            router.push(`/courses/${courseId}/lessons/${lessonId}`)
        }
    }

    function openLessonCreatePage() {
        if (courseId) {
            router.push(`/courses/${courseId}/lessons/create`)
        }
    }

    console.log(isEditable)

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <Button
                    variant="subtle"
                    color="gray"
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={() => router.back()}
                    mb="md"
                >
                    Вернуться
                </Button>
                <h1>{course?.title}</h1>
                <Flex direction="column" gap="md">
                    {lessons?.map((lesson, index) => (
                        <Card className={classes.lessonCard} key={index} shadow="sm" padding="lg" radius="md" withBorder>
                            <Flex justify="space-between" gap="md">
                                <Group mt="md" mb="xs">
                                    <Badge variant="default">Урок {index + 1}</Badge>
                                    <Title className={classes.title} order={2} fw={600}>{lesson.title}</Title>
                                </Group>
                                <Button onClick={() => openLessonPage(lesson.id)} size="lg">Перейти</Button>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
                {
                    isEditable && (
                        <Flex onClick={openLessonCreatePage} mt="md" justify="center">
                            <Button variant="light" size="xl">Создать урок</Button>
                        </Flex>
                    )
                }
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default LessonsPage;