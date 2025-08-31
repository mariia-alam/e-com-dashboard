import { Post } from "@/configs/api";
import { loginBaseURL } from "@/configs/axios";


export const authApi = {

    Login: async (payload: any) =>
        {
            const res = await Post(`${loginBaseURL}api/login`, payload)
            return res
        }
} 

