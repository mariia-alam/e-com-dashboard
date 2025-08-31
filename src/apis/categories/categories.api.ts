import { Get } from "@/configs/api";
import { baseURL } from "@/configs/axios";

export const categoriesApi = {

    AllCategories: async () => {
        const res = await Get(`${baseURL}products/categories`)
        return res
    },
}