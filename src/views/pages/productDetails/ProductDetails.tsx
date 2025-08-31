import { productsApi } from "@/apis/products/products.api";
import type { Product } from "@/dtos/products.dto";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import RButton from "@/RComponents/RButton";
import Reviews from "./Reviews";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";

const ProductDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const GetProduct = useQuery<Product>({
        queryKey: ["product"],
        queryFn: () => productsApi.ProductById(Number(id)),
        enabled: !!id,
    });
    
    const handleImage = (image: string) => {
        setSelectedImage(image);
    };

    if (GetProduct.isLoading) {
        return <div className="p-10 flex h-screen w-full justify-center items-center">{t("common.loading")}</div>;
    }

    if (GetProduct.isError || !GetProduct.data) {
        return <div className="p-10 flex h-screen w-full justify-center items-center text-red-500">{t("productPage.error_loading")}</div>;
    }

    const displayedImage = selectedImage || GetProduct.data.thumbnail;

    return (
        <div className="p-10 flex flex-col  min-h-screen w-full bg-gray-100 gap-8 overflow-auto">
            {/* --------------------------back to---------------------------- */}
            <RButton text={t("dashboard.productPage.back")} icon={<FiArrowLeft />} className="px-5 py-2 w-fit" onClick={() => navigate(-1)} />
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
                {/* --------------------------images---------------------------- */}
                <div className="gap-6 md:w-2/3 bg-white rounded-xl shadow p-8 flex items-center justify-center flex-col">
                    <img src={displayedImage} alt={GetProduct.data.title} className="w-full max-w-[500px] h-auto object-contain rounded-lg" />
                    <div className="bg-white  p-4 flex flex-wrap justify-center gap-4">
                        <div
                            className={`p-2 border-2 rounded-lg cursor-pointer ${selectedImage === GetProduct.data.thumbnail ? 'border-orange-500' : 'border-transparent'}`}
                            onClick={() => handleImage(GetProduct.data.thumbnail)}
                        >
                            <img src={GetProduct.data.thumbnail} alt="Thumbnail 1" className="w-16 h-16 object-cover rounded-md" />
                        </div>
                        {GetProduct.data.images?.map((image, index) => (
                            <div
                                key={index}
                                className={`p-2 border-2 rounded-lg cursor-pointer ${selectedImage === image ? 'border-orange-500' : 'border-transparent'}`}
                                onClick={() => handleImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 2}`} className="w-16 h-16 object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* --------------------------Product Information---------------------------- */}
                <ProductInfo GetProduct={GetProduct}/>
            </div>
            {/* --------------------------title + description---------------------------- */}
                <ProductDescription GetProduct={GetProduct}/>
            {/* --------------------------Customers reviews---------------------------- */}
                <Reviews GetProduct={GetProduct} />
        </div>
    );
};
export default ProductDetails;
