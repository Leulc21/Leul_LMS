"use client";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { Rendered_State } from "./Rendered_State";

function Uploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
      <CardContent className="flex  items-center justify-center h-full w-full">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <Rendered_State isDragActive={isDragActive} />
          //   <Rendered_Error />
        )}
      </CardContent>
    </Card>
  );
}

export default Uploader;
