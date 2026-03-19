'use client';

import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Text,
    Card,
    Group,
    Button,
    Center,
    Loader,
    Stack, TextInput, Flex, Textarea, Switch,
} from '@mantine/core';
import {IconArrowLeft, IconCalendar} from '@tabler/icons-react'; // Если используешь tabler-icons
import useGetCourseByIdQuery from "@/modules/courses/queries/useGetCourseByIdQuery";
import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useUpdateCourse from "@/modules/courses/queries/useUpdateCourse";
// import {useQueryClient} from "@tanstack/react-query";
// import {COURSES_QUERY_KEYS} from "@/modules/courses/queries/courses.query.types";

const courseEditSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Title must be at least 10 characters'),
    isPublished: z.boolean()
})

type CourseEditForm = z.infer<typeof courseEditSchema>

export default function EditCourseDetailsPage() {
    const { id } = useParams();
    // const queryClient = useQueryClient();
    const router = useRouter();
    const courseId = typeof id === 'string' ? id : null;

    const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(courseId || '')
    const { mutate: updateCourse, isSuccess } = useUpdateCourse()
    const course = courseData?.course;

    const { register, handleSubmit, formState: { errors }  } = useForm<CourseEditForm>({
        resolver: zodResolver(courseEditSchema),
        defaultValues: {
            title: course?.title,
            description: course?.description,
            isPublished: course?.isPublished,
        }
    })

    function submitForm(data: CourseEditForm) {
        console.log(data);
        console.log(courseId);
        if (courseId && data) {
            updateCourse({
                id: courseId,
                body: data
            })
        }
    }

    // useEffect(() => {
    //     if (isSuccess) {
    //         void queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEYS.getById(courseId || '') });
    //     }
    // }, [isSuccess]);

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
                    <Flex
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
                            Отменить редактирование
                        </Button>

                        <Button
                            variant="light"
                            color="green"
                            onClick={handleSubmit(submitForm)}
                            mb="md"
                        >
                            Сохранить
                        </Button>
                    </Flex>

                    <form>
                        <Card withBorder shadow="sm" radius="md" p="xl">
                            <Stack gap="lg">
                                <Group justify="space-between" align="flex-start">
                                    <TextInput
                                        label="Title"
                                        placeholder="Course title"
                                        variant="filled"
                                        defaultValue={course.title}
                                        {...register('title')}
                                        error={errors.title?.message}
                                        size="xl"
                                        required
                                    />
                                    <Switch
                                        color="teal"
                                        defaultChecked={course.isPublished}
                                        {...register('isPublished')}
                                        label="Опубликовать"
                                        size="md"
                                        // thumbIcon={
                                        //     course?.isPublished ? (
                                        //         <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                                        //     ) : (
                                        //         <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                                        //     )
                                        // }
                                    />
                                </Group>

                                <Group gap="xs" c="dimmed">
                                    <IconCalendar size={18} />
                                    <Text size="sm">Создан: {formattedDate}</Text>
                                </Group>

                                <Textarea
                                    label="Описание"
                                    placeholder="Описание курса"
                                    variant="filled"
                                    defaultValue={course.description}
                                    {...register('description')}
                                    error={errors.description?.message}
                                    size="lg"
                                    required
                                    autosize
                                    minRows={4}
                                />

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
                    </form>
                </Container>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}