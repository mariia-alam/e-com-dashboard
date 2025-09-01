import { t } from "i18next";
import {FiPlus, FiSearch} from "react-icons/fi"
import ViewToggler from "./ViewToggler";
import RButton from "@/RComponents/RButton";
import RInput from "@/RComponents/RInput";
import { productsApi } from "@/apis/products/products.api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Product, ProductPayload, ProductResponse } from "@/dtos/products.dto";
import ProductsTable from "./table/ProductsTable";
import { useState } from "react";
import { categoriesApi } from "@/apis/categories/categories.api";
import type { Category } from "@/dtos/categories.dto";
import MutateProduct from "./modals/MutateProduct";
import useDebounce from "@/hooks/use-debounce";

function Products() {

    const [ rows, setRows ] = useState(10); //set rows from user
    const [ showModal, setShowModal ] = useState(false); //add product
    const [search, setSearch] = useState(""); //search value
    const debouncedSearch = useDebounce(search, 500);



    {/* --------------------------Queries---------------------------- */}
    const AllCategories = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => categoriesApi.AllCategories(),
        // enabled: !!showModal,
    });

    const searchQuery = useQuery<ProductResponse, Error, Product[]>({
        queryKey: ["search-products", debouncedSearch],
        queryFn: () => productsApi.ProductsBySearch(debouncedSearch),
        enabled: !!debouncedSearch,
        select: (data) => data.products,
    });

    const AllProductsQuery = useInfiniteQuery<ProductResponse, Error, ProductResponse, [ string, number ], number >({
        queryKey: ['infinite-products', rows],
        queryFn: ({ pageParam = 0 }) =>
            productsApi.GetALlProducts({ pageParam, limit: rows }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.products.length < 10) return undefined;
            return lastPage.skip + lastPage.limit;
        },
    });

    const addProductMutation = useMutation({
        mutationFn: (payload: ProductPayload) => productsApi.AddProduct(payload),
        onSuccess: (data) => {
            console.log(data)
            toast.success(t("dashboard.success.add_product"), {
                style: {
                    borderRadius: "12px",
                    fontWeight: "600",
                },
            });
        },
        onError: (error: any) => {
            toast.error(("dashboard.errors.add_product"), {
                style: {
                    borderRadius: "12px",
                    fontWeight: "600",
                },
            });
            console.error("created error", error.error);
        },
    });

    const editProductMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ProductPayload }) =>
            productsApi.UpdateProduct(id, payload),
        onSuccess: (data) => {
            console.log(data)
            toast.success(t("dashboard.success.edit_product"), {
                style: {
                    borderRadius: "12px",
                    fontWeight: "600",
                },
            });
            
        },
        onError: (error: any) => {
            toast.error(("dashboard.errors.edit_product"), {
                style: {
                    borderRadius: "12px",
                    fontWeight: "600",
                },
            });
            console.error("updated error", error.error);
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => productsApi.DeleteProduct(id),
        onSuccess: (data) => {
            console.log("Login success", data);
            toast.success(t("dashboard.success.delete_product"), {
                style: {
                    borderRadius: '12px',
                    fontWeight: '600',
                }
            });
        },
        onError: (error: any) => {
            toast.error(("dashboard.errors.delete_product"), {
            style: {
                borderRadius: '12px',
                fontWeight: '600',
            }
            });
            console.error("Login error", error.error);
        },
    });

    const tableCurrentProducts = search
    ? searchQuery.data ?? []
    : AllProductsQuery.data?.pages?.flatMap((p) => p.products) ?? [];


    return (
        <div className="p-10 flex h-screen w-full bg-gray-100 flex-col justify-start gap-8 overflow-auto">
            {/* --------------------------add product modal---------------------------- */}
            {<MutateProduct
                AllCategories={AllCategories}
                addProductMutation={addProductMutation}
                rows={rows}
                open={showModal}
                close={() => setShowModal(false) }
            />}
            {/* -----------------------header------------------------- */}
            <div className="flex flex-row justify-between ">
                <div className="flex flex-col justify-start">
                    <h1 className="!font-[600]">{t("dashboard.products")}</h1>
                    <p className="text-muted-foreground font-[500]">{t("dashboard.productsPage.manage_inventory")}</p>
                </div>
                <div className=" flex flex-row justify-between items-center gap-5">
                    <ViewToggler/>
                    <RButton onClick={() => setShowModal(true)} icon={<FiPlus/>}  className="gradient-bg text-background border-none outline-none w-[180px] h-10" text={t("dashboard.productsPage.add_product")}/>
                    
                </div>
            </div>
            {/* -----------------------search------------------------- */}
            <RInput
                placeholder={t("dashboard.productsPage.search")}
                iconPosition={"left"}
                type ="text" 
                icon={<FiSearch/>}
                className=" bg-white rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* --------------------------products table---------------------------- */}
            <ProductsTable
                rows={rows}
                setRows={setRows}
                deleteProductMutation={deleteProductMutation}
                editProductMutation={editProductMutation}
                AllCategories={AllCategories}
                AllProductsQuery={AllProductsQuery}
                tableCurrentProducts={tableCurrentProducts}
                searchQuery={searchQuery}
            />
    </div>
    );
}

export default Products;
