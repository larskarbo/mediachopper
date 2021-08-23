import { FaUpload } from "react-icons/fa";

export const UploadBox = ({
  isDragActive,
  getRootProps,
  getInputProps,
  text,
  selectedFile,
  reset,
}) => {
  return (
    <div
      className={
        "rounded  my-4 w-full flex flex-col items-center py-20 justify-center h-20 relative  border border-gray-700 shadow-lg group " +
        (isDragActive ? "bg-yellow-800 border-dashed" : "bg-gray-900")
      }
      {...getRootProps()}
      onClick={()=> {}}
    >
      <input {...getInputProps()} />
      {selectedFile ? (
        <>
          <p>
            Selected: <strong>{selectedFile.name}</strong>
          </p>
          <button onClick={reset}>
            <p className="my-0 text-xs hover:underline text-gray-400">
              Select another file
            </p>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={getRootProps().onClick}
            className="mb-2 bg-white py-2 px-4 flex flex-row text-gray-500
                    border-t border-b border-r border-l rounded"
          >
            Select file <FaUpload className="ml-1 m-auto" />
          </button>
          <div className="text-xs text-gray-300">{text}</div>
        </>
      )}
    </div>
  );
};
