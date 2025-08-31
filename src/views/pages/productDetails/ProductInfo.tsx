import type { Product } from "@/dtos/products.dto";
import type { UseQueryResult } from "@tanstack/react-query";
import { t } from "i18next";

const ProductInfo = ({ GetProduct } : { GetProduct: UseQueryResult<Product, unknown>; }) => {
    return(
        <div className="flex flex-col gap-6 md:w-1/3">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800">{t("productPage.product_info")}</h3>
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">{t("productPage.weight")}:</span> <span className="text-gray-900">{GetProduct?.data?.weight}g</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">{t("productPage.stock")}:</span> <span className="text-gray-900">{GetProduct?.data?.stock} {t("productPage.units")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">{t("productPage.category")}:</span> <span className="text-gray-900 capitalize">{GetProduct?.data?.category}</span>
                    </div >
                </div>
            </div>
        </div>
    );
}
export default ProductInfo