import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productList : [],  // 출력 - 2차원 배열
  products: [],  // 원본 - 1차원 배열
  product: {}
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // state : initialState 객체
    // action : 컴포넌트에서 오는 값
    createProduct (state, action) {
        const { productList, products } = action.payload;
        
        state.productList = productList;
        state.products = products;
    },
    filterProduct (state, action) {
        // const pid = action.payload.pid;  // 둘 다 가능
        const { pid } = action.payload;
        
        // 방법1. productList가 2차원 배열이므로 flat() 함수를 이용하여 1차원 변경 후 filter
        // const [filterProduct] = state.productList.flat().filter((item)=> item.pid === pid);
        // state.product = filterProduct;

        // 방법2. product 1차원 배열에서 find 함수
        state.product = state.products.find(item => item.pid === pid);
    },
  },
})

export const { createProduct, filterProduct } 
            = productSlice.actions   //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default productSlice.reducer  //store import