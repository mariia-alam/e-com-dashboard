import type { Product } from "@/dtos/products.dto";
import ProductsLoader from "../ProductsLoader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { TableBodyProps } from "@/types";
import { useNavigate } from "react-router-dom";

const TableBody = ({
    isLoading,
    isFetchingNextPage,
    currentProducts,
    handleDeleteClick,
    handleEdit,
    productsPerPage
} : TableBodyProps ) => {

    const navigate = useNavigate();

    return(
    <tbody>
        {isLoading || isFetchingNextPage ? (
            [...Array(productsPerPage)].map((_, i) => (
                <ProductsLoader key={i} i={i} />
            ))
        ) : (
            currentProducts?.map((product: Product) => (
                <tr key={product.id} onClick={()=> navigate(`/products/${product.id}`)} className="hover:bg-gray-100 !h-20 border-[1px] cursor-pointer w-full">
                    <td className="px-4 py-2 border-b-[1px]">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-16 object-cover rounded"
                        />
                    </td>
                    <td className="px-4 py-2">
                        <div className="flex flex-col w-fit">
                            <h2 className="font-[600]">{product.title}</h2>
                            <p className="text-gray-400 font-[400] line-clamp-1">{product.description.slice(0, 55)}...</p>
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <span className="border-2 rounded-full px-3 py-1 text-xs font-[500] text-gray-600 bg-gray-100">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                    </td>
                    <td className="px-4 py-2 text-primary font-[700]">${product.price}</td>
                    <td className="px-4 py-2">
                        <button onClick={(e) =>{e.stopPropagation();  handleEdit(product)}} className="cursor-pointer mx-2">
                            <FiEdit  />
                        </button>
                        <button
                            className="text-destructive cursor-pointer mx-2"
                            onClick={(e) =>{e.stopPropagation(); handleDeleteClick(product)}}
                        >
                            <FiTrash2 />
                        </button>
                    </td>
                </tr>
            ))
        )}
    </tbody>
    );
}
export default TableBody;