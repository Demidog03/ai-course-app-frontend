'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import dynamic from "next/dynamic";
import {Button, Center, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {useParams, useRouter} from "next/navigation";
import {IconArrowLeft} from "@tabler/icons-react";
import useGetLessonQuery from "@/modules/lessons/queries/useGetLessonQuery";
import useUpdateLessonMutation from "@/modules/lessons/queries/useUpdateLessonMutation";

const editLessonSchema = z.object({
    title: z.string().min(3, 'Название не короче 3 символов'),
    content: z.any(),
    orderIndex: z.number().min(0, 'Порядковый номер не может быть отрицательным'),
})

type EditLessonForm = z.infer<typeof editLessonSchema>

const DynamicEditor = dynamic(() => import('@/modules/editor/ui/Editor'),
    {
        ssr: false,
        loading: () => <Center><span>Загрузка редактора...</span></Center>
    });

function Page() {
    const params = useParams();
    const courseId = Number(params.id);
    const lessonId = Number(params.lesson_id);
    const router = useRouter()

    const { data: lessonData, isLoading } = useGetLessonQuery({ courseId, lessonId })
    const lesson = lessonData?.lesson

    const { mutate: updateLesson } = useUpdateLessonMutation()
    const { register, control, handleSubmit } = useForm<EditLessonForm>({
        defaultValues: {
            title: '',
            content: undefined,
            orderIndex: 0
        },
        values: lesson ? {
            title: lesson?.title || '',
            content: {
                blocks: lesson?.content
            },
            orderIndex: lesson?.orderIndex || 0
        } : undefined
    })

    function onSubmit(data: EditLessonForm) {
        updateLesson({
            ...data,
            lessonId,
            courseId,
            content: JSON.stringify(data.content.blocks)
        })
    }

    if (isLoading) {
        return (
            <UserProfileWrapper>
                <WithSidebarWrapper>
                    <Center h="70vh">Загрузка урока...</Center>
                </WithSidebarWrapper>
            </UserProfileWrapper>
        )
    }

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
                <Paper withBorder shadow="sm" p={30} radius="md">
                    <Title order={2} mb="lg">Новый урок</Title>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                {...register('title')}
                                withAsterisk
                                label="Название урока"
                                placeholder="Введение в тему..."
                            />

                            <div>
                                <Text component="label" size="sm" fw={500} mb={6} display="block">
                                    Контент урока
                                </Text>
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <DynamicEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>

                            <Button type="submit" mt="md">
                                Сохранить урок
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default Page;