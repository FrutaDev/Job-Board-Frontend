import UploadCVComponent from "../components/UploadCVComponent";

export default function UploadCV() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4 mt-10">Sube tu CV</h1>
            <UploadCVComponent />
        </div>
    )
}