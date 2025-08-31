import type { Product } from "@/dtos/products.dto";
import type { UseQueryResult } from "@tanstack/react-query";
import { t } from "i18next";
import { FaCube } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

const ProductDescription = ({ GetProduct } : { GetProduct: UseQueryResult<Product, unknown>; }) => {

    return(
        <div className="w-full max-w-7xl bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900">{GetProduct?.data?.title}</h1>
                    <p className="text-gray-500 text-sm">
                        <span className="capitalize">{GetProduct?.data?.brand}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{GetProduct?.data?.category}</span>
                        <span className="mx-2">•</span>
                        <span>{t("productPage.sku")}: {GetProduct?.data?.sku || "N/A"}</span>
                    </p>
                    <span className="text-3xl font-bold text-primary my-8">${GetProduct?.data?.price}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-400 border-b-[1px] pb-5">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`h-5 w-5 ${i < Math.floor(GetProduct?.data?.rating ?? 0) ? 'fill-yellow-400' : 'text-gray-400'}`} aria-hidden="true" />
                    ))}
                </div>
                <span className="text-gray-600 text-sm">{GetProduct?.data?.rating.toFixed(1)} ({GetProduct?.data?.reviews.length} {t("productPage.reviews")})</span>
                <span className="ml-4 text-sm text-gray-600 font-[500] flex items-center gap-2">
                    <FaCube/>{GetProduct?.data?.stock && GetProduct?.data?.stock > 0 ? `${GetProduct?.data?.stock} in stock` : 'Out of stock'}
                </span>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">{t("productPage.description")}</h2>
                <p className="text-gray-700 mt-2">{GetProduct?.data?.description}</p>
            </div>
        </div>
    );
}
export default ProductDescription