import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductAvatar } from './ProductAvatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../feature/product/productAPI.js';

export function ProductList() {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const [number, setNumber] = useState(3);
    
    useEffect(() => {
        // 1. createProduct
        dispatch(getProductList(number));

    }, [number]);

    return (
        <div>            
            { productList && productList.map((rowArray, index) =>
                    <div className='product-list' key={index}>
                    { rowArray && rowArray.map((product, idx) =>
                        <Link to={`/products/${product.pid}`} key={idx}>
                            <ProductAvatar img={product.image} />
                        </Link> 
                    )}
                </div>
            )}
        </div>
    );
}