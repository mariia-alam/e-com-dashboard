import type { Product } from "@/dtos/products.dto";
import { cn } from "@/lib/utils";
import type { UseQueryResult } from "@tanstack/react-query";
import { t } from "i18next";
import { FiStar } from "react-icons/fi";

const Reviews = ({
    GetProduct
} : { GetProduct: UseQueryResult<Product, unknown> } ) => {

    return(
    <div className="w-full max-w-7xl bg-white rounded-xl shadow p-6 flex self-start flex-col gap-4">
        <div className="flex gap-5 items-center">
            <h1 className="text-lg font-semibold text-gray-800">{t("productPage.customer_Rev")}</h1>
            <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">{GetProduct?.data?.reviews.length}</span>
        </div>
        <div className="flex flex-col gap-6">
            {GetProduct?.data?.reviews.map((review, index) => {
                const date = new Date(review.date);
                return(
                <div key={index} className={cn("flex flex-col gap-2 p-4", index !== GetProduct.data.reviews.length - 1 ? "border-b-[1px]" : "")}>
                    <div className=" flex items-center gap-2 bg">
                        <div className=" bgtext-xl h-12 w-12 bg-primary rounded-full text-background flex items-center justify-center" >{review.reviewerName.split(" ").map(word => word[0].toUpperCase()).join("")}</div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={`h-4 w-4 ${i < review.rating ? ' fill-yellow-400' : 'text-gray-500'}`} aria-hidden="true" />
                                ))}
                                <span
                                    className="text-sm text-gray-500"
                                >
                                    { date.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
                </div>
                );
            })}
        </div>
    </div>
    );
}
export default Reviews