import clsx from 'clsx';
import React from 'react';
import { VinciButton } from './VinciButton';
import VinciFormField from './VinciFormField';
import { VinciInput } from './VinciInput';
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
      className={clsx('flex items-center text-base py-2 gap-2 pr-8  ')}
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
