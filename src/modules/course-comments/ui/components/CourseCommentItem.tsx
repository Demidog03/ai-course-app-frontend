import {CourseComment} from "@/modules/course-comments/api/course-comments.types";
import {Button, Group, Textarea, Text, Flex, Stack} from "@mantine/core";
import {useState} from "react";

interface Props {
    comment: CourseComment
    onUpdate: (content: string) => Promise<CourseComment | null>
    onDelete: () => Promise<boolean>
}

export default function CourseCommentItem({comment, onUpdate, onDelete}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const handleSave = async () => {
        await onUpdate(editContent);
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await onDelete();
    }

    return (
        <Stack gap="xs">
            <Flex justify="space-between" align="center">
                <Text fw={600}>{comment.user.fullName}</Text>
                <Text size="xs" c="dimmed">{new Date(comment.createdAt).toLocaleDateString()}</Text>
            </Flex>
            {isEditing ? (
                <>
                    <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        minRows={3}
                        autosize
                    />
                    <Group justify="flex-end" mt="sm">
                        <Button onClick={handleSave}>Сохранить</Button>
                    </Group>
                </>
            ) : (
                <Text size="sm">{comment.content}</Text>
            )}
            <Flex justify="flex-end" gap="xs">
                <Button variant="subtle" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Отмена" : "Изменить"}
                </Button>
                <Button variant="subtle" color="red" onClick={handleDelete}>Удалить</Button>
            </Flex>
        </Stack>
    )
}