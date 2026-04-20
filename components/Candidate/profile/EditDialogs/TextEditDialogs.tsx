"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TextEditDialogProps {
  label: string; // e.g. "About", "Bio"
  initialText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (value: string) => Promise<boolean>;
  maxLength?: number;
}

export default function TextEditDialog({
  label,
  initialText,
  open,
  onOpenChange,
  onSubmit,
  maxLength = 200,
}: TextEditDialogProps) {
  const [value, setValue] = useState(initialText);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (val: string) => {
    setValue(val);
    setError(
      val.length > maxLength ? `Maximum ${maxLength} characters allowed` : "",
    );
  };

  const handleSubmit = async () => {
    if (value.length > maxLength) {
      setError(`Maximum ${maxLength} characters allowed`);
      return;
    }
    try {
      setLoading(true);
      const success = await onSubmit(value);
      if (success) onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setValue(initialText); // reset on close
      setError("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
          <DialogDescription>
            Update your {label.toLowerCase()}. Max {maxLength} characters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <textarea
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Write your ${label.toLowerCase()} here...`}
          />
          <div className="flex justify-between text-xs">
            <span className="text-destructive">{error}</span>
            <span
              className={
                value.length > maxLength
                  ? "text-destructive"
                  : "text-muted-foreground"
              }
            >
              {value.length}/{maxLength}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !!error}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
