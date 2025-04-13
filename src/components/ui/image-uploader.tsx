import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  maxSizeMB?: number;
}

export function ImageUploader({
  onImageSelect,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onImageSelect(file);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
