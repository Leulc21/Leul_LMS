import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

export function Rendered_State({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center px-4">
      {/* Icon wrapper */}
      <div className="flex mx-auto items-center justify-center size-16 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-8 text-muted-foreground",
            isDragActive && "animate-pulse text-primary"
          )}
        />
      </div>

      {/* Description text */}
      {isDragActive ? (
        <p className="font-medium text-sm text-muted-foreground max-w-md mx-auto">
          Drop the files here ...
        </p>
      ) : (
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground max-w-md mx-auto">
          <div className="flex items-center justify-center gap-1 text-center">
            Drag & drop files here, or{" "}
            <span className="text-primary underline cursor-pointer font-semibold">
              browse
            </span>{" "}
            to upload
          </div>
          <Button type="button">Select Files</Button>
        </div>
      )}
    </div>
  );
}

export function Rendered_Error() {
  return (
    <div className="text-destructive text-center px-4">
      <ImageIcon className="size-10 mx-auto mb-3" />
      <div className="flex flex-col items-center gap-2 text-center">
        <div>
          <p className="text-base font-semibold">upload failed</p>
          <p className="text-xs text-muted-foreground ">
            Something went wrong while uploading.
          </p>
        </div>
        <p className="text-xl text-muted-foreground">
          Click or Drag file to retry
        </p>
        <Button type="button" className="">
          Retry Upload File (Drag or Click) here
        </Button>
      </div>
    </div>
  );
}
