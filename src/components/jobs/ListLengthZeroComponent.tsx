export default function ListLengthZeroComponent({ message }: { message: string }) {
    return (
        <div className="flex flex-1 mt-15 justify-center overflow-hidden w-full">
            <h2 className="font-bold text-red-500 text-xl">No hay {message} disponibles</h2>
        </div>
    );
}