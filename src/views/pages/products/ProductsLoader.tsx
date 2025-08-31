const ProductsLoader = ( { i } : { i: number } ) => {
    return(
        <tr key={i} className="border-b-[1px]">
            <td>
            <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td >
            <div className="h-4 bg-gray-200 rounded w-40 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-60 animate-pulse"></div>
            </td>
            <td >
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td >
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td >
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            </td>
        </tr>
    );
}
export default ProductsLoader;