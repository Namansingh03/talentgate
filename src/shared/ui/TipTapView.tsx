"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";

interface RichTextProps {
  html: string;
}

export default function TipTapView({ html }: RichTextProps) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
      }),
      Image,
    ],
    content: html,
    immediatelyRender: false,
  });

  return (
    <EditorContent
      editor={editor}
      className="
        prose
        max-w-none

        [&_.ProseMirror]:outline-none

        [&_ul]:list-disc
        [&_ul]:ml-6

        [&_ol]:list-decimal
        [&_ol]:ml-6

        [&_img]:rounded-lg
        [&_img]:max-w-full
      "
    />
  );
}
