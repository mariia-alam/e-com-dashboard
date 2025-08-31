import RButton from "@/RComponents/RButton";
import type { DeleteProductProps } from "@/types";
import { t } from "i18next";
import { FaExclamationTriangle } from "react-icons/fa";
import {  FiX } from "react-icons/fi";

const DeleteProduct = ({
    deleteProductMutation,
    open,
    handleDelete,
    productToDelete,
    close
}: DeleteProductProps) => {

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <dialog open={open} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4 text-center">
            {/* --------------------------header---------------------------- */}
            <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl font-bold flex items-center">
                    <FaExclamationTriangle className="text-red-500 mr-2" />
                    {t("dashboard.productsPage.deletep")}
                </h2>
                <RButton
                    size="icon"
                    icon={<FiX size={20}/>}
                    onClick={close}
                    className="w-fit text-foreground font-semibold  shadow-none transition-colors"
                />
            </div>
            {/* --------------------------body---------------------------- */}
            <div className="flex flex-col">
                <p className="text-gray-700 mb-4 text-left">
                    {t("dashboard.productsPage.delete_title")}
                </p>
                <div className="border-[1px] border-red-400 text-red-700 p-4 rounded-md flex items-start">
                <FaExclamationTriangle className="text-red-400 mr-2 mt-1" />
                <p>
                    {t("dashboard.productsPage.sure_delete")}{" "}
                    <span className="font-extrabold">{productToDelete?.title}</span>?
                </p>
                </div>
            </div>
            {/* --------------------------actions---------------------------- */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
                <RButton
                    disabled={deleteProductMutation.isPending}
                    text={t("common.cancel")}
                    onClick={close}
                    className="w-fit px-3 h-11  rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                />
                <RButton
                    disabled={deleteProductMutation.isPending}
                    iconRight={true}
                    isLoading={deleteProductMutation.isPending}
                    text={t("dashboard.productsPage.deletep")}
                    onClick={handleDelete}
                    className="w-fit px-3 h-11 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                />
            </div>
        </dialog>
        </div>
    );
}
export default DeleteProduct;