import { get, destroy, post, put } from './axios';

    export const Get = async <T = any>(url: string, config = {}) => {
    const res = await get<T>(url, config);
    return res.data;
    };

    export const Post = async <T = any>(url: string, data?: any, config = {}) => {
    const res = await post<T>(url, data, config);
    return res.data;
    };

    export const Put = async <T = any>(url: string, data?: any, config = {}) => {
    const res = await put<T>(url, data, config);
    return res.data;
    };

    export const Del = async <T = any>(url: string, config = {}) => {
    const res = await destroy<T>(url, config);
    return res.data;
    };
