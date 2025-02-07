"use client";
import React, {  useState } from "react";
import {  IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps{
    onSucces:(res:IKUploadResponse)=> void
    onProgress?: (progress:number) => void
    fileType?:"image"|"video"
}



export default function FileUpload(
  {  onSucces,
    onProgress,
    fileType ="image"}: FileUploadProps
) {
    const [uploading, setUploading] = useState (false)
    const [error , setError] = useState<string|null>(null)
  const onError = (err:{message:string}) => {
  console.log("Error", err);
  setError(err.message)
  setUploading(false)
};

const handleSuccess = (response:IKUploadResponse) => {
  console.log("Success", response);
  setUploading(false)
  setError(null)
  onSucces(response)
};

const handleProgress = (evt:ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
        const percenComplete =(evt.loaded/evt.total)*100;
        onProgress(Math.round(percenComplete))
        
    }

}
const handleStartUpload = () => {
  setUploading(true);
  setError(null)
};
const validateFile = (file: File) => {
  if (fileType === "video") {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("Video must be less than 100 MB");
      return false;
    }
    return true;
  } else {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid file (JPEG, PNG, WebP)");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5 MB"); // Fixed error message
      return false;
    }
    return true; // Corrected return value for valid images
  }
};
  return (
    <div className="space-y-2">
      <h1>ImageKit Next.js quick start</h1>
             <p>Upload an image with advanced options</p>
        <IKUpload
          fileName={fileType === "video"? "video": "image"}
          useUniqueFileName={true}
          validateFile={validateFile}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          accept={fileType === "video"? "video/*" :"image/*"}
          onUploadStart={handleStartUpload}
          className="file-input file-input-bordered w-full"
          useUniqueFileName={true}
          folder={fileType === "video"?  "/videos": "/images"}
        />
        {uploading&&(
            <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="animate-spin w-4 h-4"/>
                <span>Uploading...</span>
            </div>
        )}
        {error&&(
            <div className="text-error text-sm text-red-500">{error}</div>
        )}
      </div>
  );
}