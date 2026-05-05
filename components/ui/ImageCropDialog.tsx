"use client";

import React, { useState } from "react";
import Cropper from "react-easy-crop";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  image: string | null;
  onClose: () => void;
  onSave: (file: File) => void;
}

export default function AvatarCropDialog({
  open,
  image,
  onClose,
  onSave,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleSave = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();

    const file = new File([blob], "avatar.png", {
      type: "image/png",
    });

    onSave(file);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Avatar</DialogTitle>
        </DialogHeader>

        <div className="relative h-80 bg-black rounded-md overflow-hidden">
          {image && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          )}
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
