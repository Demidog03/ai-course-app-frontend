import {Button, Group, Textarea} from "@mantine/core";
import React, {useState} from "react";
import {CourseComment} from "@/modules/course-comments/api/course-comments.types";

interface Props {
    onSubmit: (content: string) => Promise<CourseComment | null>
    isPending: boolean
}

export default function CourseCommentForm({onSubmit, isPending}: Props) {
    const [content, setContent] = useState('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!content.trim() || isPending) return
        const success = await onSubmit(content)
        if (success) setContent('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Textarea
                placeholder="Напишите ваш комментарий..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minRows={3}
                autosize
                style={{width: "100%"}}
            />
            <Group justify="flex-end">
                <Button
                    type="submit"
                    disabled={isPending}
                    mt="sm"
                    mb="sm"
                >
                    {isPending ? "Отправка..." : "Отправить"}
                </Button>
            </Group>
        </form>
    )
}