'use client'

import {Text, Title} from "@mantine/core";

function LessonRenderer({ content }: { content: Record<string, unknown>[] | undefined }) {
    if (!content || !Array.isArray(content)) {
        return null
    }

    return (
        <div>
            {content?.map((block, index) => {
                switch (block.type) {
                    case 'header':
                        return <Title
                            key={block.id || index}
                            order={block?.data?.level as number}
                            mt="xl"
                            mb="sm"
                            dangerouslySetInnerHTML={{ __html: block?.data?.text }}
                        />;
                    case 'paragraph':
                        return <Text
                            key={block.id || index}
                            size="lg"
                            lh={1.6}
                            mb="md"
                            dangerouslySetInnerHTML={{ __html: block?.data?.text }}
                        />
                }
            })}
        </div>
    );
}

export default LessonRenderer;