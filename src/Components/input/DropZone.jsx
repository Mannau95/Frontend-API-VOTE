import React, { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, X, AlertCircle } from "lucide-react";

const ACCEPTED_TYPES = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];
const ACCEPTED_EXTENSIONS = ".csv, .xlsx, .xls";

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/**
 * DropZone — reusable file drop area
 *
 * Props:
 *   file        {File|null}   currently selected file (controlled)
 *   onChange    {fn}          called with File or null
 *   accept      {string}      optional MIME string for <input accept>
 *   error       {string}      optional external validation error message
 */
export default function DropZone({
                                     file,
                                     onChange,
                                     accept = ACCEPTED_EXTENSIONS,
                                     error,
                                 }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [typeError, setTypeError] = useState("");

    const validate = (f) => {
        if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(csv|xlsx|xls)$/i)) {
            setTypeError("Format non accepté. Utilisez un fichier CSV ou Excel.");
            return false;
        }
        setTypeError("");
        return true;
    };

    const pick = (f) => {
        if (f && validate(f)) onChange(f);
    };

    const onInputChange = (e) => pick(e.target.files?.[0] ?? null);

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        pick(e.dataTransfer.files?.[0] ?? null);
    };

    const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
    const onDragLeave = () => setDragging(false);

    const clear = (e) => {
        e.stopPropagation();
        onChange(null);
        setTypeError("");
        if (inputRef.current) inputRef.current.value = "";
    };

    const displayError = typeError || error;

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={onInputChange}
            />

            {/* Drop zone */}
            <div
                onClick={() => !file && inputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`relative w-full rounded-xl border-2 border-dashed transition-colors
          ${file
                    ? "border-blue-200 bg-blue-50 cursor-default"
                    : dragging
                        ? "border-blue-400 bg-blue-50 cursor-copy"
                        : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer"
                }
          ${displayError ? "border-red-300 bg-red-50" : ""}
        `}
            >
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center select-none">
                    {file ? (
                        <>
                            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                <FileSpreadsheet className="w-5 h-5" />
                            </div>
                            <div className="text-sm font-medium text-gray-800 max-w-xs truncate">
                                {file.name}
                            </div>
                            <div className="text-xs text-gray-400">{formatFileSize(file.size)}</div>
                            <button
                                type="button"
                                onClick={clear}
                                className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                            >
                                <X className="w-3 h-3" /> Supprimer
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors
                ${dragging ? "bg-blue-200 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                                <UploadCloud className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-blue-500">Cliquez pour choisir</span>{" "}
                                ou glissez-déposez votre fichier
                            </p>
                            <p className="text-xs text-gray-400">CSV, XLSX ou XLS</p>
                        </>
                    )}
                </div>
            </div>

            {/* Error */}
            {displayError && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {displayError}
                </p>
            )}
        </div>
    );
}