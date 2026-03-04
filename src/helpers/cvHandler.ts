import { API } from "../axios/url"

export const handleUploadCV = async (file: File) => {
    const formData = new FormData()
    formData.append("cv", file)
    try {
        const { data } = await API.put("/cv", formData)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const handleGetCV = async () => {
    try {
        const { data } = await API.get("/cv")
        return data
    } catch (error) {
        console.error(error)
    }
}

export const handleDeleteCV = async () => {
    try {
        console.log("delete cv")
        const { data } = await API.delete("/cv")
        return data
    } catch (error) {
        console.error(error)
    }
}

export const handleDragOver = (setIsDragging: React.Dispatch<React.SetStateAction<boolean>>, e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
};

export const handleDragLeave = (setIsDragging: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsDragging(false);
};

export const handleDrop = (setFile: React.Dispatch<React.SetStateAction<File | null>>, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>, e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
        setFile(droppedFile);
    }
};

export const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
    }
};

export const removeFile = (setFile: React.Dispatch<React.SetStateAction<File | null>>, fileInputRef: React.RefObject<HTMLInputElement | null>) => {
    setFile(null);
    if (fileInputRef?.current) fileInputRef.current.value = "";
};