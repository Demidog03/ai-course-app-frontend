'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import dynamic from "next/dynamic";
import {Button, Center, Paper, Stack, Text, TextInput, Title} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import useCreateLessonMutation from "@/modules/lessons/queries/useCreateLessonMutation";
import {useParams} from "next/navigation";

const createLessonSchema = z.object({
    title: z.string().min(3, 'Название не короче 3 символов'),
    content: z.any(),
    orderIndex: z.number().min(0, 'Порядковый номер не может быть отрицательным'),
})

type CreateLessonForm = z.infer<typeof createLessonSchema>

const DynamicEditor = dynamic(() => import('@/modules/editor/ui/Editor'),
    {
        ssr: false,
        loading: () => <Center><span>Загрузка редактора...</span></Center>
    });

function Page() {
    const params = useParams();
    const courseId = Number(params.id);

    const { mutate: createLesson } = useCreateLessonMutation()
    const { register, control, handleSubmit } = useForm<CreateLessonForm>({
        defaultValues: {
            title: '',
            content: undefined,
            orderIndex: 0
        },
    })

    function onSubmit(data: CreateLessonForm) {
        createLesson({
            ...data,
            courseId,
            content: JSON.stringify(data.content.blocks)
        })
    }

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
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