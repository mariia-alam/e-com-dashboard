import type { Product, ProductResponse } from "@/dtos/products.dto";
import type { ProductsTableProps } from "@/types";
import { useState } from "react";
import DeleteProduct from "../modals/DeleteProduct";
import { queryClient } from "@/configs/queryClient";
import MutateProduct from "../modals/MutateProduct";
import TableFooter from "./Footer";
import TableBody from "./Body";
import { t } from "i18next";
import { FiLoader } from "react-icons/fi";

const ProductsTable = ({
    deleteProductMutation,
    AllProductsQuery,
    setRows,
    rows,
    AllCategories,
    editProductMutation,
    tableCurrentProducts,
    searchQuery
} : ProductsTableProps ) => {

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } = AllProductsQuery;
    const [currentPage, setCurrentPage] = useState(1);
    const [ showModal, setShowModal ] = useState<{value: boolean , state: "delete" | "edit" | "" , product: Product | null}>({ value: false, state: "", product: null});


    const productsPerPage = 10;
    const currentProducts = data?.pages?.[currentPage - 1]?.products ?? [];
    const totalProducts = data?.pages?.[0]?.total || 0;

    const handleNext = () => {
        if (hasNextPage) {
            fetchNextPage();
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleDelete = () => {
    if (showModal.product) {
        deleteProductMutation.mutate(showModal.product.id, {
        onSuccess: () => {
            queryClient.setQueryData(
            ["infinite-products", rows],
            (oldData: any) => {
                if (!oldData) return oldData;
                return {
                ...oldData,
                pages: oldData.pages.map((page: ProductResponse) => ({
                    ...page,
                    products: page.products.filter(
                    (p: Product) => p.id !== showModal.product?.id
                    ),
                })),
                };
            }
            );
            setShowModal({value: false , state: "", product: null})
        },
        });
    }
    };

    const handleDeleteClick = (product: Product) => {
        setShowModal({value: true , state: "delete", product: product})
    };

    const handleEdit = (product: Product) => {
        setShowModal({value: true , state: "edit", product: product})
    };
    

    return (
        <div className="bg-white rounded-xl shadow-lg ">
            {/* --------------------------header---------------------------- */}
            <table className="relative border-[1px] border-gray-300 rounded-t-md w-full text-left border-separate border-spacing-0 ">
                <thead className="border-[1px] border-b-gray-300 ">
                    <tr className="bg-transparent text-gray-400 font-[400] ">
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                {/* --------------------------body---------------------------- */}
                { searchQuery.isLoading || isLoading ?
                    <tr className="h-20">
                        <td colSpan={5} className="p- text-center text-gray-500 bg-amber-50">
                        <FiLoader size={50} className="m-auto animate-spin"/> 
                        </td>
                    </tr>
                :
                tableCurrentProducts.length === 0 ? (
                    <tr className="h-20">
                        <td colSpan={5} className="p- text-center text-gray-500 bg-amber-50">
                        {t("common.no_results")}
                        </td>
                    </tr>
                    )
                : 
                    <TableBody
                        currentProducts={tableCurrentProducts}
                        handleDeleteClick={handleDeleteClick}
                        handleEdit={handleEdit}
                        isFetchingNextPage={isFetchingNextPage}
                        isLoading={isLoading}
                        productsPerPage={productsPerPage}
                    />
                }
            </table>
            {/* --------------------------footer---------------------------- */}
            <TableFooter 
                currentPage={currentPage}
                handleNext={handleNext}
                handlePrev={handlePrev}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                setRows={setRows}
                totalProducts={totalProducts}
                data={data}
                hasNextPage={hasNextPage}
            />
            {/* --------------------------delete modal---------------------------- */}
            <DeleteProduct
                deleteProductMutation={deleteProductMutation}
                open={showModal.state==="delete"}
                handleDelete={handleDelete}
                productToDelete={showModal.product}
                close={() => setShowModal({value: false , state: "", product: null}) }
            />
            {/* --------------------------edit product modal---------------------------- */}
            <MutateProduct
                AllCategories={AllCategories}
                editProductMutation={editProductMutation}
                productToEdit={showModal.product}
                mode="edit"
                open={showModal.state==="edit"}
                close={() => setShowModal({value: false , state: "", product: null}) }
            />
        </div>
    );
};

export default ProductsTable;
