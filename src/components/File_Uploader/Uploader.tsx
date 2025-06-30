"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "../ui/card";
import { Rendered_Error, Rendered_State } from "./Rendered_State";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key: string | null;
  isDeleting: boolean;
  error: boolean;
  objectUrl: string | null;
  fileType: "image" | "video";
}

function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    key: null,
    isDeleting: false,
    error: false,
    objectUrl: null,
    fileType: "image",
  });

  const uploadFile = async (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));
    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });
      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }
      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentComplete),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key: key,
            }));
            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.error("Something went wrong");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        id: uuidv4(),
        error: false,
        isDeleting: false,
        fileType: "image",
        objectUrl: URL.createObjectURL(file),
        key: null,
      });
      uploadFile(file);
    }
  }, []);

  const onRejected = (fileRejection: FileRejection[]) => {
    if (fileRejection.length > 0) {
      const toManyFiles = fileRejection.find(
        (r) => r.errors[0].code === "too-many-files"
      );
      const fileTooLarge = fileRejection.find(
        (r) => r.errors[0].code === "file-too-large"
      );
      const invalidType = fileRejection.find(
        (r) => r.errors[0].code === "file-invalid-type"
      );
      if (invalidType)
        toast.error("❌ Invalid file type. Only image files are allowed");
      if (fileTooLarge) toast.error("File is too large, maximum size is 5MB");
      if (toManyFiles) toast.error("You can only upload one file at a time");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    onDropRejected: onRejected,
  });

  function renderContent() {
    if (fileState.uploading) {
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Uploading {fileState.file?.name}...
          </p>
          <Progress value={fileState.progress} className="h-2" />
        </div>
      );
    }
    if (fileState.error) {
      return <Rendered_Error />;
    }
    if (fileState.objectUrl) {
      return <h1>Uploaded successfully!</h1>;
    }
    return <Rendered_State isDragActive={isDragActive} />;
  }

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
        {renderContent()}
      </CardContent>
    </Card>
  );
}

export default Uploader;
