import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Toolbar from "./Toolbar";
import { useEffect } from "react";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure(), BulletList, OrderedList, ListItem],
    content: description,
    editorProps: {
      attributes: {
        class:
          "ltr rounded-md border min-h-[150px] border-gray-300 bg-white px-3 py-2 text-black ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description || "");
    }
  }, [description, editor]);
  return (
    <>
      <div className="custom-html-editor-en border border-gray-300 bg-transparent text-black rounded-md">
      <div className="sticky top-0 bg-white z-10">
        <Toolbar editor={editor} />
      </div>
      <div className="max-h-[300px] overflow-y-auto editor-content-en">
        <EditorContent editor={editor} dir="rtl" className="text-start" />
      </div>
    </div>
    </>
  );
}
