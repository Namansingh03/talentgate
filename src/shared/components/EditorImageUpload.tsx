"use client";

import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/src/shared/ui/toggle";

interface Props {
  editor: Editor;
}

export default function ImageUploadButton({ editor }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();

      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: file.name,
        })
        .run();
    } catch (err) {
      console.error(err);
    }

    e.target.value = "";
  };

  return (
    <>
      <Toggle
        size="sm"
        onPressedChange={() => inputRef.current?.click()}
        aria-label="Insert image"
      >
        <ImageIcon className="h-4 w-4" />
      </Toggle>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />
    </>
  );
}
