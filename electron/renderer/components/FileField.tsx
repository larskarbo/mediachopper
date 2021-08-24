import { VinciInput } from "./VinciInput";
import { VinciButton } from "./VinciButton";
import clsx from "clsx";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import VinciFormField from "./VinciFormField";
export function FileField({
  getRootProps,
  getInputProps,
  isDragActive,
  selectedFile,
  text,
  disabled = false,
}) {
  return (
    <VinciFormField
      className={clsx(
        "flex items-center text-xs py-2 gap-2 pr-8  ",
        
      )}
      label={text}
    >
      <input {...getInputProps()} />
      <VinciInput disabled={disabled} readOnly value={selectedFile?.path} />
      <VinciButton disabled={disabled} onClick={getRootProps().onClick}>
        Browse
      </VinciButton>
    </VinciFormField>
  );
}
