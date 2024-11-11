import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useTranslation } from "react-i18next";
import EngToolbar from "./EngToolbar";
import { useEffect } from "react";

export default function EngTiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const { i18n } = useTranslation();
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
    <div className="custom-html-editor border border-gray-300 bg-transparent text-black rounded-md">
      <div className="sticky top-0 bg-white z-10">
        <EngToolbar editor={editor} />
      </div>
      <div className="max-h-[300px] overflow-y-auto editor-content">
        <EditorContent editor={editor} dir="rtl" className="text-end" />
      </div>
    </div>
  );
}
