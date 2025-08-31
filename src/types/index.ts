import type { Category } from "@/dtos/categories.dto";
import type { Product, ProductPayload, ProductResponse } from "@/dtos/products.dto";
import type { productSchema } from "@/utils/Validations/products.validation";
import type {  UseInfiniteQueryResult, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import type { Dispatch, InputHTMLAttributes, MouseEventHandler, ReactNode, SetStateAction } from "react";
import type z from "zod";

export type RButtonProps = {
  className?: string;
  style?: any;
  textClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hidden?: boolean;
  icon?: string | LucideIcon | ReactNode; // 👈 لسه عنا 3 حالات
  text?: string;
  type?: "button" | "submit" | "reset";
  key?: React.Key;
  id?: string;
  iconRight?: boolean;
  variant?:
    | "default"
    | "ghost"
    | "link"
    | "destructive"
    | "outline"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
};

export type RInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  inputClassName?: string;
  isLoading?: boolean;
  inputError?: boolean;
  icon?: string | LucideIcon | ReactNode;
  iconPosition?: "right" | "left";
};

export type ProductsTableProps = {
    editProductMutation?: UseMutationResult<any, unknown, { id: number; payload: ProductPayload }, unknown>;
    AllCategories: UseQueryResult<Category[], unknown>;
    searchQuery: UseQueryResult<Product[], unknown>;
    rows: number;
    setRows: Dispatch<SetStateAction<number>>;
    AllProductsQuery: UseInfiniteQueryResult<ProductResponse, Error>
    deleteProductMutation: UseMutationResult<any, unknown, number, unknown>;
    tableCurrentProducts: Product[]
};

export type DeleteProductProps = {
  open: boolean;
  productToDelete: Product | null;
  deleteProductMutation: UseMutationResult<any, unknown, number, unknown>;
  handleDelete: () => void;
  close: () => void;
};

export type AddProductProps = {
    AllCategories: UseQueryResult<Category[], unknown>;
    addProductMutation?: UseMutationResult<any, unknown, ProductPayload, unknown>;
    editProductMutation?: UseMutationResult<any, unknown, { id: number; payload: ProductPayload }, unknown>;
    rows?: number;
    open: boolean;
    close: () => void;
    mode?: "create" | "edit";
    productToEdit?: z.infer<typeof productSchema> | null;
};

export type TableFooterProps = {
    currentPage: number;
    productsPerPage: number;
    totalProducts: number;
    setRows: (rows: number) => void;
    setCurrentPage: (page: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    data?: ProductResponse | undefined;
    hasNextPage?: boolean;
};

export type TableBodyProps = {
    isLoading: boolean;
    isFetchingNextPage: boolean;
    currentProducts: Product[];
    handleDeleteClick: (product: Product) => void;
    handleEdit: (product: Product) => void;
    productsPerPage: number;
};