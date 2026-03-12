import React from 'react';
import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Course} from "@/modules/courses/api/courses.api.types";

function CourseCard({ course }: { course: Course }) {
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
                <Badge color="pink">On Sale</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {course.description}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    );
}

export default CourseCard;
