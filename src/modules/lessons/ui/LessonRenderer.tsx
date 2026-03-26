'use client'

import { Text, Title } from '@mantine/core'
import type { TitleOrder } from '@mantine/core'

type EditorBlock = {
    id?: string
    type: string
    data?: {
        level?: number
        text?: string
    }
}

function LessonRenderer({
    content,
}: {
    content: Record<string, unknown>[] | undefined
}) {
    if (!content || !Array.isArray(content)) {
        return null
    }

    return (
        <div>
            {content.map((raw, index) => {
                const block = raw as EditorBlock
                const key = block.id ?? String(index)
                switch (block.type) {
                    case 'header': {
                        const order = (block.data?.level ?? 2) as TitleOrder
                        const html = block.data?.text ?? ''
                        return (
                            <Title
                                key={key}
                                order={order}
                                mt="xl"
                                mb="sm"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        )
                    }
                    case 'paragraph': {
                        const html = block.data?.text ?? ''
                        return (
                            <Text
                                key={key}
                                size="lg"
                                lh={1.6}
                                mb="md"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        )
                    }
                    default:
                        return null
                }
            })}
        </div>
    )
}

export default LessonRenderer;