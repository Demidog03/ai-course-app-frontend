'use client'

import EditorJS, {OutputData} from "@editorjs/editorjs";
import classes from "./editor.module.css";
import {useEffect, useRef} from "react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

interface EditorProps {
    value: OutputData | undefined;
    onChange: (value: OutputData) => void;
}

function Editor({ value, onChange }: EditorProps) {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: 'editorjs-container',
                data: value,
                placeholder: 'Начните писать урок...',
                tools: {
                    header: Header,
                    list: List,
                    paragraph: Paragraph,
                },
                onChange: async () => {
                    const content = await editor.save()
                    onChange(content)
                }
            })

            editorRef.current = editor
        }

        // при unmount
        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy()
                editorRef.current = null
            }
        }
    }, [])

    return (
        <div id="editorjs-container" className={classes.editorContainer}></div>
    );
}

export default Editor;