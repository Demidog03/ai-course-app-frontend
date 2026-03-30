'use client'

import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Anchor, Blockquote, Box, Code, Divider, List, Table, Text, Title } from '@mantine/core'

const markdownComponents: Components = {
    p: ({ children }) => (
        <Text component="p" size="sm" mb="sm" lh={1.65}>
            {children}
        </Text>
    ),
    strong: ({ children }) => (
        <Text component="strong" span fw={700} inherit>
            {children}
        </Text>
    ),
    em: ({ children }) => (
        <Text component="em" span fs="italic" inherit>
            {children}
        </Text>
    ),
    ul: ({ children }) => (
        <List type="unordered" size="sm" mb="sm" spacing={6}>
            {children}
        </List>
    ),
    ol: ({ children }) => (
        <List type="ordered" size="sm" mb="sm" spacing={6}>
            {children}
        </List>
    ),
    li: ({ children }) => <List.Item>{children}</List.Item>,
    a: ({ href, children }) => (
        <Anchor href={href} size="sm" target="_blank" rel="noopener noreferrer">
            {children}
        </Anchor>
    ),
    blockquote: ({ children }) => (
        <Blockquote mb="sm" py="xs" px="sm" fz="sm">
            {children}
        </Blockquote>
    ),
    h1: ({ children }) => (
        <Title order={3} mb="xs" mt="md">
            {children}
        </Title>
    ),
    h2: ({ children }) => (
        <Title order={4} mb="xs" mt="sm">
            {children}
        </Title>
    ),
    h3: ({ children }) => (
        <Title order={5} mb="xs" mt="sm">
            {children}
        </Title>
    ),
    hr: () => <Divider my="md" />,
    table: ({ children }) => (
        <Table.ScrollContainer minWidth={400} mb="sm" type="native">
            <Table verticalSpacing="xs" fz="sm" striped highlightOnHover>
                {children}
            </Table>
        </Table.ScrollContainer>
    ),
    thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
    tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
    tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
    th: ({ children }) => <Table.Th>{children}</Table.Th>,
    td: ({ children }) => <Table.Td>{children}</Table.Td>,
    code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className ?? '')
        const text = String(children).replace(/\n$/, '')
        if (match) {
            return (
                <Code block mb="sm" className={className} style={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </Code>
            )
        }
        if (text.includes('\n')) {
            return (
                <Code block mb="sm" style={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </Code>
            )
        }
        return <Code fz="sm">{children}</Code>
    },
    pre: ({ children }) => <>{children}</>,
}

export function AITutorAnswerContent({ markdown }: { markdown: string }) {
    return (
        <Box style={{ wordBreak: 'break-word' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {markdown}
            </ReactMarkdown>
        </Box>
    )
}
