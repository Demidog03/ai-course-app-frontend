'use client';

import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Title,
    Text,
    Badge,
    Card,
    Group,
    Button,
    Center,
    Loader,
    Stack,
} from '@mantine/core';
import { IconArrowLeft, IconCalendar } from '@tabler/icons-react'; // Если используешь tabler-icons
import useGetCourseByIdQuery from "@/modules/courses/queries/useGetCourseByIdQuery";
import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const courseId = typeof id === 'string' ? id : null;

    const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(courseId || '')
    const course = courseData?.course;

    if (isLoading) {
        return (
            <UserProfileWrapper>
                <WithSidebarWrapper>
                    <Center h="70vh">
                        <Loader color="blue" type="dots" />
                    </Center>
                </WithSidebarWrapper>
            </UserProfileWrapper>
        );
    }

    if (isError || !course) {
        return (
            <UserProfileWrapper>
                <WithSidebarWrapper>
                    <Center h="70vh">
                        <Stack align="center">
                            <Text c="red" size="xl" fw={700}>Курс не найден</Text>
                            <Button variant="outline" onClick={() => router.push('/courses')}>
                                Вернуться к списку
                            </Button>
                        </Stack>
                    </Center>
                </WithSidebarWrapper>
            </UserProfileWrapper>
        );
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'long',
    }).format(new Date(course.createdAt));

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <Container size="md" mt="xl">
                    <Button
                        variant="subtle"
                        color="gray"
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={() => router.back()}
                        mb="md"
                    >
                        Назад к курсам
                    </Button>

                    <Card withBorder shadow="sm" radius="md" p="xl">
                        <Stack gap="lg">
                            <Group justify="space-between" align="flex-start">
                                <Title order={1}>{course.title}</Title>
                                <Badge
                                    color={course.isPublished ? 'green' : 'yellow'}
                                    variant="light"
                                    size="lg"
                                >
                                    {course.isPublished ? 'Опубликован' : 'Черновик'}
                                </Badge>
                            </Group>

                            <Group gap="xs" c="dimmed">
                                <IconCalendar size={18} />
                                <Text size="sm">Создан: {formattedDate}</Text>
                            </Group>

                            <Text size="md" lh={1.6}>
                                {course.description || 'Описание пока не добавлено.'}
                            </Text>

                            <Group mt="xl">
                                <Button size="md" color="blue">
                                    Начать обучение
                                </Button>

                                {/* Здесь в будущем можно добавить проверку роли,
                        чтобы показывать кнопку "Редактировать" только админам */}
                                {/* <Button variant="outline" size="md">Редактировать курс</Button> */}
                            </Group>
                        </Stack>
                    </Card>
                </Container>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}