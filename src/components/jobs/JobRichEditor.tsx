import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
    value: string,
    onChange: (html: string) => void,
    placeholder?: string
}

export default function JobEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2] },
            })
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "job-editor",
            }
        }
    });

    return (
        <EditorContent editor={editor} />
    );
}