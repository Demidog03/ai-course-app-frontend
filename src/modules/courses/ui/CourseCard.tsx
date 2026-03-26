'use client'

import React from 'react'
import { Badge, Button, Card, Group, Image, Stack, Text } from '@mantine/core'
import { Course } from '@/modules/courses/api/courses.api.types'
import { useRouter } from 'next/navigation'
import { IconCalendar } from '@tabler/icons-react'
import surfaceClasses from './course-surface.module.css'

function CourseCard({ course }: { course: Course }) {
    const router = useRouter()

    function handleClickLearn() {
        router.push(`/courses/${course.id}`)
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'long',
    }).format(new Date(course.updatedAt || course.createdAt))

    function getCoverImage() {
        if (process.env.NEXT_PUBLIC_BASE_API_URL && course?.coverImage) {
            return `${process.env.NEXT_PUBLIC_BASE_API_URL}/${course.coverImage}`
        }
        return 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
    }

    return (
        <Card
            padding="lg"
            radius="lg"
            withBorder
            className={`${surfaceClasses.surface} ${surfaceClasses.surfaceInteractive}`}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <Card.Section className={surfaceClasses.cardImageSection}>
                <Image
                    className={surfaceClasses.cardImageRoot}
                    src={getCoverImage()}
                    height={160}
                    alt={course.title}
                />
            </Card.Section>

            <Stack gap="xs" mt="md" style={{ flex: 1 }}>
                <Group
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                    gap="sm"
                >
                    <Text fw={500} lineClamp={2} style={{ flex: 1, minWidth: 0 }}>
                        {course.title}
                    </Text>
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

                <Text size="sm" c="dimmed" lineClamp={3}>
                    {course.description}
                </Text>
            </Stack>

            <Group mt="md" gap="xs" c="dimmed" style={{ flexShrink: 0 }}>
                <IconCalendar size={14} />
                <Text size="xs">Обновлено: {formattedDate}</Text>
            </Group>

            <Button
                onClick={handleClickLearn}
                color="brand"
                fullWidth
                mt="md"
                radius="lg"
                style={{ flexShrink: 0 }}
            >
                Перейти к курсу
            </Button>
        </Card>
    )
}

export default CourseCard
