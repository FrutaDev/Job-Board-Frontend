export default function PaginationComponent({ page, setPage, total, limit }: { page: number, setPage: (page: number) => void, total: number, limit: number }) {
    const totalPages = Math.ceil(total / limit);
    const isFirst = page === 1;
    const isLast = page >= totalPages;

    return (
        <nav className="flex flex-col space-y-4 px-4 py-4 mt-10 border-t border-gray-100 items-center">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => !isFirst && setPage(page - 1)}
                    disabled={isFirst}
                    className={`flex items-center justify-center p-2 rounded-lg border transition-all duration-200
                        ${isFirst
                            ? "border-gray-100 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 text-gray-600 hover:border-[#D5A521] hover:text-[#D5A521] cursor-pointer hover:bg-[#D5A521]/5 active:scale-95"}`}
                    aria-label="Página anterior"
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-sm font-medium text-gray-400">Página</span>
                    <span className="mx-2 text-sm font-bold text-[#D5A521]">{page}</span>
                    <span className="text-sm font-medium text-gray-400">de {totalPages || 1}</span>
                </div>

                <button
                    onClick={() => !isLast && setPage(page + 1)}
                    disabled={isLast}
                    className={`flex items-center justify-center p-2 rounded-lg border transition-all duration-200
                        ${isLast
                            ? "border-gray-100 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 text-gray-600 hover:border-[#D5A521] hover:text-[#D5A521] cursor-pointer hover:bg-[#D5A521]/5 active:scale-95"}`}
                    aria-label="Página siguiente"
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
