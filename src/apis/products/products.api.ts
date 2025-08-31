import { Get, Post, Del, Put } from "@/configs/api";
import { baseURL } from "@/configs/axios";
import type { ProductResponse } from "@/dtos/products.dto";
import type { ProductPayload } from "@/utils/Validations/products.validation";


export const productsApi = {

    GetALlProducts: async ({ pageParam , limit }: {pageParam: number, limit: number}): Promise<ProductResponse> => {
        const url = `${baseURL}products?limit=${limit}&skip=${pageParam}`;
        const res = await Get(url);
        console.log(res)
        return {
            products: res.products,
            total: res.total,
            skip: pageParam,
            limit: limit,
        };
    },

    AddProduct: async (payload: ProductPayload) => {
        const res = await Post(`${baseURL}products/add`, payload)
        return res
    },

    DeleteProduct: async (id: number) => {
        const res = await Del(`${baseURL}products/${id}`)
        return res
    },

    UpdateProduct: async (id: number, payload: ProductPayload) => {
        const res = await Put(`${baseURL}products/${id}`, payload)
        return res
    },

    ProductById: async (id: number) => {
        const res = await Get(`${baseURL}products/${id}`)
        return res
    },
    ProductsBySearch: async (params: string) => {
        const url = `${baseURL}products/search?q=${params}`;
        const res = await Get(url)
        return res
    },
    ProductsByCategories: async (params: string) => {
        const url = `${baseURL}products/category/${params}`;
        const res = await Get(url)
        return res
    },
} 

