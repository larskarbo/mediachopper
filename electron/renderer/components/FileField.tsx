import { VinciInput } from './VinciInput';
import { VinciButton } from "./VinciButton";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
export function FileField({ onSelectFile, selectedFile, text, disabled=false }) {
  const onDrop = useCallback((acceptedFiles) => {
    if(disabled){
      return
    }
    const rawFile: File = acceptedFiles[0];
    console.log("rawFile: ", rawFile);
    onSelectFile(rawFile);
    // if (rawFile.type.includes("video")) {
    // } else {
    //   handleIndex(rawFile);
    // }
  }, [disabled, onSelectFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      onClick={() => {}}
      className={clsx(
        "flex items-center text-xs py-2 gap-2 pr-8  ",
        (isDragActive && !disabled) && "bg-yellow-900"
      )}
    >
      <input {...getInputProps()} />
      <div className="text-gray-400 w-32 text-right">{text}</div>
      <VinciInput disabled={disabled} readOnly value={selectedFile?.path}  />
      <VinciButton disabled={disabled} onClick={getRootProps().onClick} >Browse</VinciButton>
    </div>
  );
}
