'use client'

import { Box, Checkbox, Code, Image, List, Stack, Text, Title } from '@mantine/core'
import type { TitleOrder } from '@mantine/core'

type ChecklistItem = {
    text?: string
    checked?: boolean
}

type NestedListItem = {
    content?: string
    items?: NestedListItem[]
    meta?: Record<string, unknown>
}

type EditorBlock = {
    id?: string
    type: string
    data?: {
        level?: number
        text?: string
        code?: string
        file?: { url?: string }
        caption?: string
        stretched?: boolean
        withBackground?: boolean
        withBorder?: boolean
        items?: string[] | ChecklistItem[] | NestedListItem[]
        style?: 'ordered' | 'unordered' | 'checklist'
    }
}

function isNestedListItem(value: unknown): value is NestedListItem {
    return Boolean(value) && typeof value === 'object' && 'content' in (value as Record<string, unknown>)
}

function renderNestedListItems(items: NestedListItem[], ordered: boolean, keyPrefix: string) {
    return items.map((item, i) => {
        const content = item.content ?? ''
        const nested = Array.isArray(item.items) ? item.items : []
        return (
            <List.Item
                // eslint-disable-next-line react/no-array-index-key
                key={`${keyPrefix}-${i}`}
            >
                <span dangerouslySetInnerHTML={{ __html: content }} />
                {nested.length > 0 ? (
                    <List type={ordered ? 'ordered' : 'unordered'} spacing="xs" mt={6}>
                        {renderNestedListItems(nested, ordered, `${keyPrefix}-${i}`)}
                    </List>
                ) : null}
            </List.Item>
        )
    })
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
                    case 'code': {
                        const code = block.data?.code ?? ''
                        return (
                            <Code key={key} block mb="md">
                                {code}
                            </Code>
                        )
                    }
                    case 'image': {
                        const url = block.data?.file?.url
                        if (!url) return null
                        const caption = block.data?.caption?.trim()
                        const stretched = Boolean(block.data?.stretched)
                        return (
                            <Box key={key} mb="md">
                                <Image
                                    src={url}
                                    alt={caption || 'image'}
                                    radius="md"
                                    fit="contain"
                                    style={{
                                        width: '100%',
                                        maxWidth: stretched ? '100%' : 760,
                                    }}
                                />
                                {caption ? (
                                    <Text c="dimmed" size="sm" mt={6}>
                                        {caption}
                                    </Text>
                                ) : null}
                            </Box>
                        )
                    }
                    case 'list': {
                        const items = block.data?.items ?? []
                        const style = block.data?.style
                        const ordered = style === 'ordered'
                        const isChecklistStyle = style === 'checklist'
                        if (!Array.isArray(items) || items.length === 0) return null
                        if (isChecklistStyle) {
                            return (
                                <Stack key={key} gap={6} mb="md">
                                    {(items as ChecklistItem[]).map((item, i) => (
                                        <Checkbox
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={`${key}-${i}`}
                                            checked={Boolean(item?.checked)}
                                            readOnly
                                            label={<span dangerouslySetInnerHTML={{ __html: item?.text ?? '' }} />}
                                        />
                                    ))}
                                </Stack>
                            )
                        }
                        const first = items[0] as unknown
                        const isNested = isNestedListItem(first)
                        return (
                            <List key={key} type={ordered ? 'ordered' : 'unordered'} mb="md" spacing="xs">
                                {isNested
                                    ? renderNestedListItems(items as NestedListItem[], ordered, key)
                                    : (items as string[]).map((item, i) => (
                                          <List.Item
                                              // eslint-disable-next-line react/no-array-index-key
                                              key={`${key}-${i}`}
                                          >
                                              <span dangerouslySetInnerHTML={{ __html: item }} />
                                          </List.Item>
                                      ))}
                            </List>
                        )
                    }
                    case 'checklist': {
                        const items = (block.data?.items ?? []) as ChecklistItem[]
                        if (!Array.isArray(items) || items.length === 0) return null
                        return (
                            <Stack key={key} gap={6} mb="md">
                                {items.map((item, i) => (
                                    <Checkbox
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`${key}-${i}`}
                                        checked={Boolean(item?.checked)}
                                        readOnly
                                        label={<span dangerouslySetInnerHTML={{ __html: item?.text ?? '' }} />}
                                    />
                                ))}
                            </Stack>
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