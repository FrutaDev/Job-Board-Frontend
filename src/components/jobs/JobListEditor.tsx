import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
    value: string,
    onChange: (html: string) => void,
}

export default function JobListEditor({ value, onChange }: Props) {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {},
                orderedList: {},
                heading: false,
            }),
        ],
        content: value || "<ul><li></li></ul>",
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return <EditorContent editor={editor} />;
}
