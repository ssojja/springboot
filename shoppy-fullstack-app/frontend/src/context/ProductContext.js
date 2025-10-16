import { createContext, useState } from "react";

// 1. Context 생성
export const ProductContext = createContext();

// 2. ProductProvider는 ProductContext를 사용하는 컴포넌트들의 범위를 정의
export const ProductProvider = ({children}) => {
    const [productList, setProductList] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [product, setProduct] = useState({});

    return (
        <ProductContext.Provider 
                        value={{
                                productList, setProductList,
                                imgList, setImgList,
                                product, setProduct
                            }}>
            {children}
        </ProductContext.Provider>
    );
}