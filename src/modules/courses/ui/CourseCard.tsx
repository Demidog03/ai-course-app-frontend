import React from 'react';
import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Course} from "@/modules/courses/api/courses.api.types";
import {useRouter} from "next/navigation";
import {IconCalendar} from "@tabler/icons-react";

function CourseCard({ course }: { course: Course }) {
    const router = useRouter()

    function handleClickLearn() {
        router.push(`/courses/${course.id}`)
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'long',
    }).format(new Date(course.updatedAt || course.createdAt));

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{course.title}</Text>
                <Badge
                    color={course.isPublished ? 'green' : 'yellow'}
                    variant="light"
                    size="lg"
                >
                    {course.isPublished ? 'Опубликован' : 'Черновик'}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {course.description}
            </Text>

            <Group mt="md" gap="xs" c="dimmed">
                <IconCalendar size={14} />
                <Text size="xs">Обновлено: {formattedDate}</Text>
            </Group>

            <Button onClick={handleClickLearn} color="blue" fullWidth mt="md" radius="md">
                Learn now!
            </Button>
        </Card>
    );
}

export default CourseCard;
