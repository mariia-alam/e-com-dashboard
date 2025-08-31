import type { TableFooterProps } from "@/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TableFooter = ({
    currentPage,
    productsPerPage,
    totalProducts,
    setRows,
    setCurrentPage,
    handleNext,
    handlePrev,
    data,
    hasNextPage
} : TableFooterProps ) => {

    return(
        <div className="flex justify-between items-center p-4">
            <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * productsPerPage + 1} to {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} results
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rows per page:</span>
                    <select
                        className="border rounded-md py-1 px-2 text-sm text-gray-700"
                        onChange={(e) => {
                            setRows(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        defaultValue={10}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={0}>All</option>
                    </select>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        First
                    </button>
                    <button className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100" onClick={handlePrev} disabled={currentPage === 1}>
                        <FiChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 rounded-md bg-orange-500 text-white text-sm font-semibold">
                        {currentPage}
                    </span>
                    <button className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100" onClick={handleNext} disabled={!hasNextPage}>
                        <FiChevronRight className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100" onClick={() => data?.pages ? setCurrentPage(Math.ceil(totalProducts / productsPerPage)) : null} disabled={!hasNextPage}>
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
}
export default TableFooter;