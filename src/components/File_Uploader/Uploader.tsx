"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Rendered_State } from "./Rendered_State";

function Uploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  function Rejected(fileRejection: FileRejection[]) {
    if (fileRejection.length > 0) {
      const ToManyFile = fileRejection.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files"
      );
      const FileTooLarge = fileRejection.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large"
      );
      const InvalidType = fileRejection.find(
        (fileRejection) => fileRejection.errors[0].code === "file-invalid-type"
      );
      if (InvalidType) {
        toast.error("❌ Invalid file type. Only image files are allowed");
      }
      if (FileTooLarge) {
        toast.error("File is too large, maximum size is 5MB");
      }
      if (ToManyFile) {
        toast.error("You can only upload one file at a time");
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5 MB
    multiple: false,
    onDropRejected: Rejected,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "p-6 border-dashed border-2 transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full">
        <input {...getInputProps()} />
        <Rendered_State isDragActive={isDragActive} />
        {/* <Rendered_Error /> */}
      </CardContent>
    </Card>
  );
}

export default Uploader;
