"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "hello me editor",
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
