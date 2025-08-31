import type z from "zod";
import { loginSchema } from "@/utils/Validations/auth.validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/apis/auth/auth.api";
import useAuthStore from "@/store";

import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import RButton from "@/RComponents/RButton";
import toast from "react-hot-toast";

import logo from '@/assets/images/logo.png'
import RInput from "@/RComponents/RInput";


function Login() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login:loginUser, token, isLoggedIn } = useAuthStore((state) => state);

    const loginMutation = useMutation({
        mutationFn: (payload: { email: string; password: string }) => authApi.Login(payload),
        onSuccess: (data) => {
            console.log("Login success", data);
            toast.success(t("auth.success.login"), {
                style: {
                    borderRadius: '12px',
                    fontWeight: '600',
                }
            });
            loginUser(data.token);
            
        },
        onSettled: ()=> {
            navigate("/products")
        },
        onError: (error: any) => {
            toast.error(error.error ?? t("auth.common.error"), {
            style: {
                borderRadius: '12px',
                fontWeight: '600',
            }
            });
            console.error("Login error", error.error);
        },
    });

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        console.log("data",data)
        loginMutation.mutate(data);
    };

    if(isLoggedIn && token){
        return <Navigate to="/products"/>
    }

    return (
        <FormProvider {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(`w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%]
                max-w-[700px] py-10 px-8 m-auto bg-white 
                rounded-lg shadow-md
                flex-col flex gap-10 items-center`, loginMutation.isPending && "pointer-events-none")}//loading
        >
            {/* -----------------------welcome------------------------- */}
            <div className="flex flex-col items-center gap-0">
                <img src={logo} className="w-14 h-14 mb-3"  alt="" />
                <h1 >{t("common.welcome_back")}</h1>
                <h2 className="text-gray-400">{t("auth.login_Action")}</h2>
            </div>
            <div className="flex flex-col gap-5 w-full">
                {/* -----------------------email------------------------- */}
                <div className="flex flex-col  ">
                    <label htmlFor="email" className="px-1 font-[600]">{t("auth.email")}</label>
                    <RInput {...form.register("email")} placeholder={t("auth.placeholder.email")} type ="email"   className=" bg-white rounded-md"/>
                    {form.formState.errors.email && (
                        <p className="text-error">
                        {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                {/* -----------------------password------------------------- */}
                <div className="flex flex-col  ">
                    <label htmlFor="password" className="px-1 font-[600]">{t("auth.password")}</label>
                    <RInput  {...form.register("password")} placeholder={t("auth.placeholder.password")} type ="password"   className=" bg-white rounded-md"/>
                    {form.formState.errors.password && (
                        <p className={cn("text-error")}>
                        {form?.formState?.errors?.password?.message}
                        </p>
                    )} 
                </div>
                <p className="text-gray-400">Demo credentials:  eve.holt@reqres.in  |  cityslicka</p>
                {/* -----------------------actions--------------------------- */}
                <RButton
                className={cn("h-11 text-background gradient-bg bg-gradient-to-r")}
                    text={t("auth.login")}
                    type="submit"
                    isLoading={loginMutation.isPending}//loading
                />
            </div>
        </form>
        </FormProvider>
    );
}

export default Login;