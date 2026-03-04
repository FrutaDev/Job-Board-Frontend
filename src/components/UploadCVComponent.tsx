import { useState, useRef, useEffect } from "react";
import { FiUpload, FiFileText, FiCheckCircle, FiX } from "react-icons/fi";
import { handleUploadCV, handleDeleteCV, handleGetCV, handleDragOver, handleDragLeave, handleDrop, handleFileChange, removeFile } from "../helpers/cvHandler";

export default function UploadCVComponent() {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log(fileName)
    }, [fileName])

    useEffect(() => {
        (async () => {
            try {
                const cv = await handleGetCV()
                if (cv) {
                    setFileName(`${cv.data.name}_cv.pdf`)
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])



    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-xl mx-auto">
            <form
                onDragOver={(e) => handleDragOver(setIsDragging, e)}
                onDragLeave={() => handleDragLeave(setIsDragging)}
                onDrop={(e) => handleDrop(setFile, setIsDragging, e)}
                className={`w-full relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 flex flex-col items-center justify-center
                    ${isDragging ? "border-[#D5A521] bg-amber-50 scale-[1.02]" : "border-gray-300 bg-white"}
                    ${file ? "border-green-500 bg-green-50/30" : "hover:border-purple-600"}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(setFile, e)}
                    accept="application/pdf"
                    className="hidden"
                    id="cv-upload"
                />

                {!file && !fileName ? (
                    <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center text-center">
                        <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? "bg-[#D5A521] text-white" : "bg-gray-100 text-gray-400"}`}>
                            <FiUpload className="text-3xl" />
                        </div>
                        <p className="text-lg font-semibold text-gray-700">Arrastra tu CV aquí</p>
                        <p className="text-sm text-gray-400 mt-1">Solo archivos <span className="font-bold text-gray-600">PDF</span> hasta 5MB</p>
                    </label>
                ) : (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="p-4 rounded-full bg-green-500 text-white mb-4 shadow-lg shadow-green-200">
                            <FiCheckCircle className="text-2xl" />
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-green-200 shadow-sm">
                            <FiFileText className="text-green-600" />
                            <span className="text-sm lowercase font-medium text-gray-700 truncate max-w-[200px]">
                                {file ? file.name : fileName ? fileName : ""}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeFile(setFile, fileInputRef)}
                                className="ml-2 p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                            >
                                <FiX />
                            </button>
                        </div>
                        <p className="text-xs text-green-600 mt-3 font-medium text-center">¡Archivo cargado con éxito!</p>
                    </div>
                )}
            </form>
            <div className="flex gap-3">
                <button
                    onClick={async () => {
                        try {

                            await handleUploadCV(file!)
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                    type="submit"
                    disabled={!file}
                    className={`mt-6 w-full p-3 rounded-xl font-bold transition-all duration-300 shadow-lg 
                    ${file
                            ? "bg-gray-900 text-white hover:bg-[#D5A521] cursor-pointer hover:-translate-y-1 active:scale-95"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}
                        `}
                >
                    Subir o actualizar CV
                </button>
                <button
                    onClick={async () => {
                        try {
                            await handleDeleteCV()
                            setFile(null)
                            setFileName("")
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                    type="submit"
                    disabled={!fileName && !file}
                    className={`mt-6 p-2 rounded-xl font-bold transition-all duration-300 shadow-lg whitespace-nowrap 
                    ${file || fileName
                            ? "bg-red-600 text-white hover:bg-red-900 cursor-pointer hover:-translate-y-1 active:scale-95"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}
                        `}
                >
                    Eliminar CV
                </button>
            </div>
        </div>
    );
}