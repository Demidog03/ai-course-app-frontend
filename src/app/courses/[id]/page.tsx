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
    Stack, Flex, Image,
} from '@mantine/core';
import {IconArrowLeft, IconCalendar, IconEdit} from '@tabler/icons-react'; // Если используешь tabler-icons
import useGetCourseByIdQuery from "@/modules/courses/queries/useGetCourseByIdQuery";
import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import surfaceClasses from "@/modules/courses/ui/course-surface.module.css";
import useCheckIfEditable from "@/shared/hooks/useCheckIfEditable";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const courseId = typeof id === 'string' ? id : null;

    const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(courseId || '')
    const course = courseData?.course;

    const { status: isEditable } = useCheckIfEditable(course?.authorId)

    function goToEditPage() {
        router.push(`/courses/edit/${course?.id}`)
    }

    function getCoverImage() {
        if (process.env.NEXT_PUBLIC_BASE_API_URL && course?.coverImage) {
            return `${process.env.NEXT_PUBLIC_BASE_API_URL}/${course.coverImage}`;
        }
        return 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
    }

    function openLessonsPage() {
        if (course?.id) {
            router.push(`/courses/${course.id}/lessons`)
        }
    }

    if (isLoading) {
        return (
            <UserProfileWrapper>
                <WithSidebarWrapper>
                    <Center h="70vh">
                        <Loader color="brand" type="dots" />
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
                    <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        gap="md"
                    >
                        <Button
                            variant="subtle"
                            color="gray"
                            leftSection={<IconArrowLeft size={16} />}
                            onClick={() => router.back()}
                            mb="md"
                        >
                            Назад к курсам
                        </Button>

                        {isEditable && (
                            <Button
                                variant="light"
                                color="yellow"
                                leftSection={<IconEdit size={16} />}
                                onClick={goToEditPage}
                                mb="md"
                            >
                                Редактировать
                            </Button>
                        )}
                    </Flex>

                    <Card
                        withBorder
                        radius="lg"
                        padding={0}
                        className={surfaceClasses.surface}
                    >
                        <Card.Section className={surfaceClasses.detailHeroSection}>
                            <Image
                                src={getCoverImage()}
                                height={400}
                                fit="cover"
                                alt={course.title}
                            />
                        </Card.Section>
                        <Stack gap="lg" p="xl">
                            <Group
                                justify="space-between"
                                align="flex-start"
                                wrap="nowrap"
                                gap="sm"
                            >
                                <Title
                                    order={1}
                                    lineClamp={3}
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    {course.title}
                                </Title>
                                {!course.isPublished && (
                                    <Badge
                                        color={course.isPublished ? 'green' : 'caramel'}
                                        variant="light"
                                        size="lg"
                                        style={{ flexShrink: 0 }}
                                    >
                                        Черновик
                                    </Badge>
                                )}
                            </Group>

                            <Group gap="xs" c="dimmed">
                                <IconCalendar size={18} />
                                <Text size="sm">Создан: {formattedDate}</Text>
                            </Group>

                            <Text size="md" lh={1.6}>
                                {course.description || 'Описание пока не добавлено.'}
                            </Text>

                            <Group mt="xl">
                                <Button onClick={openLessonsPage} size="md" color="brand">
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