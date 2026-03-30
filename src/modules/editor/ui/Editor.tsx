'use client'

import EditorJS, {OutputData} from "@editorjs/editorjs";
import classes from "./editor.module.css";
import {useEffect, useRef} from "react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import {apiPrivate} from "@/shared/lib/api-private";

interface EditorProps {
    value: OutputData | undefined;
    onChange: (value: OutputData) => void;
}

function getBackendOrigin(): string {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/v1"
    return apiBase.replace(/\/api\/v1\/?$/, "")
}

function toAbsoluteBackendUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) return url
    const origin = getBackendOrigin()
    if (url.startsWith("/")) return `${origin}${url}`
    return `${origin}/${url}`
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
                    code: CodeTool,
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile: async (file: File) => {
                                    const form = new FormData()
                                    form.append('image', file)
                                    const res = await apiPrivate.post<{ success: 1; file: { url: string } }>(
                                        '/uploads/editor-image',
                                        form,
                                        { headers: { 'Content-Type': 'multipart/form-data' } }
                                    )
                                    return {
                                        success: 1,
                                        file: { url: toAbsoluteBackendUrl(res.data.file.url) },
                                    }
                                },
                                uploadByUrl: async (url: string) => {
                                    return {
                                        success: 1,
                                        file: { url },
                                    }
                                }
                            }
                        }
                    }
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