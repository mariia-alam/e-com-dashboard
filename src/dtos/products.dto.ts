export interface ProductPayload {
    id?:number;
    title: string;
    description: string;
    price: number;
    category: string;
    thumbnail?: string;
}

export interface ProductResponse {
    pages?: ProductResponse[];
    pageParams?: [];
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: string; // ISO string
    reviewerName: string;
    reviewerEmail: string;
}

export interface Meta {
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    barcode: string;
    qrCode: string;
}
