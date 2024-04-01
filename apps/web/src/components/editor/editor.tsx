"use client";

import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";
import MenuBar from "./menu-bar";

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}

const Editor: React.FC<EditorProps> = ({ value, setValue, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Placeholder.configure({ placeholder: placeholder }),
      Markdown.configure({ html: false, transformCopiedText: true }),
    ],
    onUpdate: ({ editor }) => {
      setValue(editor.storage.markdown.getMarkdown());
    },
    content: value,
    editorProps: {
      attributes: {
        class: "prose max-w-none font text-sm",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className="bg-white border-3 border-gray-900 rounded-xl text-gray-900 flex flex-col max-h-104">
      {editor && <MenuBar editor={editor} />}
      <div className="w-full" onClick={() => editor?.chain().focus().run()}>
        <EditorContent
          className="flex-1 w-full overflow-x-hidden overflow-y-auto p-5 pr-4 outline-none min-h-96"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Editor;
