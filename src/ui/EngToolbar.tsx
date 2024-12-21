import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
} from "lucide-react";

import { Toggle } from "./Toggle";
import { useTranslation } from "react-i18next";
type Props = {
  editor: Editor | null;
};
export default function EngToolbar({ editor }: Props) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  if (!editor) {
    return null;
  }
  return (
    <>
      {dir === "ltr" ? (
        <>
          <div className="border border-input flex rounded-t-md bg-white rounded-br-lg mb-3">
            <Toggle
              size="sm"
              pressed={editor.isActive("heading")}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("heading")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              className={`${
                editor.isActive("italic")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
              className={`${
                editor.isActive("strike")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("bulletList")}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className={`${
                editor.isActive("bulletList")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedList")}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              className={`${
                editor.isActive("orderedList")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </div>
        </>
      ) : (
        <>
          <div className="border border-input flex flex-row-reverse  rounded-t-md bg-white rounded-br-lg mb-3 ">
            <Toggle
              size="sm"
              pressed={editor.isActive("heading")}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("heading")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              className={`${
                editor.isActive("italic")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
              className={`${
                editor.isActive("strike")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("bulletList")}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className={`${
                editor.isActive("bulletList")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <List className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedList")}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              className={`${
                editor.isActive("orderedList")
                  ? "bg-black text-gray-100"
                  : "bg-gray-100"
              } focus:outline-none focus:bg-black focus:text-gray-100`}
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </div>
        </>
      )}
    </>
  );
}
