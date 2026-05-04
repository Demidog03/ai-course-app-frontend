'use client'

import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Loader, Menu, ScrollArea } from "@mantine/core";
import { AITutorAnswerContent } from "./AITutorAnswerContent";
import { IconBrain } from "@tabler/icons-react";
import useAskAITutorMutation from "../queries/useAskAITutorMutation";
import { useTextSelection } from "@mantine/hooks";

const AI_TUTOR_QUESTIONS = [
    {
        id: 1,
        question: "Обьясни простыми словами",
        icon: <IconBrain size={14} />
    },

    {
        id: 2,
        question: "Приведи пример кода",
        icon: <IconBrain size={14} />
    },

    {
        id: 3,
        question: "Для чего это используется на практике?",
        icon: <IconBrain size={14} />
    },

    {
        id: 4,
        question: "Переведи на русский",
        icon: <IconBrain size={14} />
    },
]

function readSelectionRect(): DOMRect | null {
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        return null;
    }
    return sel.getRangeAt(0).getBoundingClientRect();
}

export default function AITutorWrapper({ children }: { children: JSX.Element }) {
    const { mutate: askAITutorMutation, isPending } = useAskAITutorMutation();
    const [menuOpened, setMenuOpened] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const selection = useTextSelection();
    const [aiTutorAnswer, setAiTutorAnswer] = useState<string | null>(null);

    const syncFromSelection = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setRect(readSelectionRect());
        }, 200);
    }, []);

    useEffect(() => {
        document.addEventListener("selectionchange", syncFromSelection);
        document.addEventListener("mouseup", syncFromSelection);
        return () => {
            document.removeEventListener("selectionchange", syncFromSelection);
            document.removeEventListener("mouseup", syncFromSelection);
        };
    }, [syncFromSelection]);

    function closeMenu() {
        setRect(null);
    }

    useEffect(() => {
        if (rect) {
            setMenuOpened(true);
        } else {
            setMenuOpened(false);
        }
    }, [rect])

    function askAITutor(question: string) {
        const text = selection?.toString()?.trim() ?? '';

        if (text && question) {
            askAITutorMutation({
                prompt: question,
                text: text,
            }, {
                onSuccess: (data) => {
                    setAiTutorAnswer(data.result);
                },
            })
        }
    }


    return (
        <Menu
            opened={menuOpened}
            onChange={setMenuOpened}
            position="top-start"
            shadow="md"
            width={300}
            transitionProps={{ transition: 'rotate-right', duration: 150 }}
        >
            {rect && (
                <Menu.Target>
                    <div
                        style={{
                            position: 'fixed',
                            top: rect?.top ?? 0,
                            left: rect?.left ?? 0,
                            width: Math.max(rect?.width ?? 0, 1),
                            height: Math.max(rect?.height ?? 0, 1),
                            pointerEvents: 'none',
                        }}
                    />
                </Menu.Target>
            )}
            {children}
            <Menu.Dropdown>
                <Menu.Label>Спросить AI ментора</Menu.Label>

                {AI_TUTOR_QUESTIONS.map((question) => (
                    <Menu.Item
                        key={question.id}
                        leftSection={question.icon}
                        onClick={() => askAITutor(question.question)}
                    >
                        {question.question}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>


            <Dialog
                opened={Boolean(aiTutorAnswer) || isPending}
                withCloseButton
                onClose={() => setAiTutorAnswer(null)}
                style={{ width: '800px', paddingTop: '40px' }}
                radius="lg"
                title="Ответ AI ментора"
            >
                <ScrollArea.Autosize mah="min(40vh, 700px)" type="scroll" offsetScrollbars>
                    {isPending ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Loader color="brand" type="dots" />
                        </div>
                    : aiTutorAnswer ?
                    <div>
                        <AITutorAnswerContent markdown={aiTutorAnswer} />
                    </div> : null}
                </ScrollArea.Autosize>
            </Dialog>
        </Menu >
    )
}
