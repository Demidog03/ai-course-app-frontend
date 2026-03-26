'use client'

import UserProfileWrapper from "@/modules/users/wrappers/UserProfileWrapper";
import WithSidebarWrapper from "@/modules/sidebar/wrappers/WithSidebarWrapper";
import {Paper, Title} from "@mantine/core";
import useGetLessonQuery from "@/modules/lessons/queries/useGetLessonQuery";
import {useParams} from "next/navigation";
import LessonRenderer from "@/modules/lessons/ui/LessonRenderer";

function Page() {
    const params = useParams()
    const courseId = Number(params.id)
    const lessonId = Number(params.lesson_id)

    const { data } = useGetLessonQuery({ courseId, lessonId })
    const lesson = data?.lesson

    return (
        <UserProfileWrapper>
            <WithSidebarWrapper>
                <Paper withBorder shadow="sm" p={30} radius="md">
                    <Title order={1} mb="md">
                        {lesson?.title ?? 'Урок'}
                    </Title>

                    <LessonRenderer content={lesson?.content} />
                </Paper>
            </WithSidebarWrapper>
        </UserProfileWrapper>
    );
}

export default Page;