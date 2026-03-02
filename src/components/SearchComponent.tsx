export default function SearchComponent({ search, setSearch, page, setPage, getAll, limit, debouncedSearch }: { search: string, setSearch: (search: string) => void, page: number, setPage: (page: number) => void, getAll: (limit: number, page: number, search?: string) => void, limit: number, debouncedSearch: string }) {
    return (
        <div className="w-11/12 md:w-1/2 min-h-12 border border-gray-500/30 rlzounded-xl mx-auto my-6 md:my-10 flex items-center justify-center shadow-xl focus-within:border-[#D5A521] rounded-lg">
            <form className="flex flex-row gap-4 w-full justify-between items-center" onSubmit={(e) => {
                e.preventDefault();
                getAll(limit, page, debouncedSearch);
            }}>
                <input type="text" placeholder="Buscar por titulo de empleo..." className="flex-1 outline-none bg-transparent ml-2 mr-2 focus:border-[#D5A521] z-10" value={search} onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }} />
                <button className="bg-[#D5A521] text-white px-4 rounded-lg font-semibold h-8 w-24 md:w-32 hover:bg-[#D5A521]/80 transition-colors duration-300 cursor-pointer z-10 mr-2">
                    Buscar
                </button>
            </form>
        </div>
    )
}