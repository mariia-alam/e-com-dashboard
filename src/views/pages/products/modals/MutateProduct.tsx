import { queryClient } from "@/configs/queryClient";
import type { ProductResponse } from "@/dtos/products.dto";
import RButton from "@/RComponents/RButton";
import RInput from "@/RComponents/RInput";
import type { AddProductProps } from "@/types";
import { productSchema } from "@/utils/Validations/products.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import type z from "zod";

const MutateProduct = ({
    open,
    close,
    mode = "create",
    productToEdit,
    rows,
    AllCategories,
    addProductMutation,
    editProductMutation
} : AddProductProps ) => {

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        mode: "onTouched",
        defaultValues: {
            price: 0,
        }
    });

    useEffect(() => {
        if (productToEdit) {
            form.reset({
                category: productToEdit.category,
                description: productToEdit.description,
                id: productToEdit.id,
                price: productToEdit.price,
                thumbnail: productToEdit.thumbnail,
                title: productToEdit.title,
            });
        } else {
            form.reset();
        }
    }, [productToEdit, open]);

    const onSubmit = async (data: z.infer<typeof productSchema>) => {
        if (mode === "create") {
            addProductMutation?.mutate(data, {
                onSuccess: () => { //add product localy to cash
                    queryClient.setQueryData(
                        ["infinite-products", rows],
                        (oldData: any) => {
                            if (!oldData) return oldData;
                            return {
                                ...oldData,
                                pages: oldData.pages.map((page: ProductResponse, i: number) => {
                                    if (i === 0) {
                                        return {
                                            ...page,
                                            products: [data, ...page.products],
                                        };
                                    }
                                    return page;
                                }),
                            };
                        }
                    );
                    form.reset();
                    close();
                },
            });
        } else if (mode === "edit" && data.id) {
            const editPayload = {
                title: data.title,
                description: data.description,
                price: data?.price,
                category: data?.category,
                thumbnail: data?.thumbnail,
            };
            editProductMutation?.mutate({ id: data.id, payload: editPayload },{
                onSuccess: ()=>{
                    form.reset();
                    close();
                }
            });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <dialog
                open
                className="relative rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 text-left bg-white"
            >
                <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* --------------------------header---------------------------- */}
                    <div className="flex justify-between items-start pb-4">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold flex items-center">
                                {mode === "create"
                                    ? t("dashboard.productsPage.add_newp")
                                    : t("dashboard.productsPage.edit_p")}
                            </h2>
                            <h2 className="text-gray-400">
                                {mode === "create"
                                    ? t("dashboard.productsPage.add_newp_title")
                                    : t("dashboard.productsPage.edit_title")}
                            </h2>
                        </div>
                        <RButton
                            size="icon"
                            icon={<FiX size={20} />}
                            onClick={close}
                            className="w-fit text-foreground font-semibold shadow-none transition-colors"
                        />
                    </div>
                {/* --------------------------title + price---------------------------- */}
                    <div className="flex justify-between gap-4 mb-4">
                        <div className="flex flex-col items-start w-1/2">
                            <label className="px-1 font-[600]">
                                {t("dashboard.productsPage.title")}
                            </label>
                            <RInput
                                {...form.register("title")}
                                placeholder={t("dashboard.productsPage.placeholder.title")}
                                type="text"
                                className="bg-white rounded-md w-full"
                            />
                            {form.formState.errors.title && (
                                <p className="text-error">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-start w-1/2">
                            <label className="px-1 font-[600]">
                                {t("dashboard.productsPage.price")}
                            </label>
                            <RInput
                                min={0}
                                {...form.register("price", { valueAsNumber: true })}
                                type="number"
                                className="bg-white rounded-md w-full"
                            />
                            {form.formState.errors.price && (
                                <p className="text-error">
                                    {form.formState.errors.price.message}
                                </p>
                            )}
                        </div>
                    </div>
                {/* --------------------------description---------------------------- */}
                    <div className="flex flex-col items-start w-full mb-4">
                        <label className="px-1 font-[600]">
                            {t("dashboard.productsPage.description")}
                        </label>
                        <textarea
                            {...form.register("description")}
                            placeholder={t("dashboard.productsPage.placeholder.description")}
                            className="focus:outline-none bg-white rounded-md w-full border-[1px] p-2 placeholder:text-sm placeholder:text-gray-400"
                        />
                        {form.formState.errors.description && (
                            <p className="text-error">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>
                {/* --------------------------category + image---------------------------- */}
                    <div className="flex justify-between gap-4 my-5">
                        <div className="flex flex-col items-start w-full">
                            <label className="px-1 font-[600]">
                                {t("dashboard.productsPage.category")}
                            </label>
                            <select
                                className="focus:outline-none h-9 border rounded-md py-1 px-2 text-sm text-gray-700 w-full"
                                {...form.register("category")}
                                defaultValue={""}
                            >
                                {AllCategories.data?.map((c) => (
                                    <option key={c.slug} value={c.slug}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {form.formState.errors.category && (
                                <p className="text-error">
                                    {form.formState.errors.category.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label className="px-1 font-[600]">
                                {t("dashboard.productsPage.image")}
                            </label>
                            <RInput
                                {...form.register("thumbnail")}
                                placeholder={"https://example"}
                                type="text"
                                className="bg-white rounded-md w-full"
                            />
                            {form.formState.errors.thumbnail && (
                                <p className="text-error">
                                    {form.formState.errors.thumbnail.message}
                                </p>
                            )}
                        </div>
                    </div>
                {/* --------------------------actions---------------------------- */}
                    <div className="flex justify-end space-x-4 pt-4 mt-4">
                        <RButton
                            type="button"
                            disabled={addProductMutation?.isPending || editProductMutation?.isPending}
                            text={t("common.cancel")}
                            onClick={close}
                            className="w-fit px-3 h-11 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        />
                        <RButton
                            type="submit"
                            disabled={addProductMutation?.isPending || editProductMutation?.isPending}
                            isLoading={addProductMutation?.isPending || editProductMutation?.isPending}
                            text={
                                mode === "create"
                                    ? t("dashboard.productsPage.addp")
                                    : t("dashboard.productsPage.editp")
                            }
                            className="w-fit px-3 h-11 rounded-md gradient-bg text-white font-semibold transition-colors"
                        />
                    </div>
                </form>
                </FormProvider>
            </dialog>
        </div>
    );
};

export default MutateProduct;
