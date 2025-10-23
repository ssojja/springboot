import { createSlice } from '@reduxjs/toolkit'
import { cartItemsCheck, cartItemsAddInfo } from '../../utils/cart.js';

const initialState = {
  cartCount: 0,
  cartList: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // state : initialState 객체
    // action : 컴포넌트에서 오는 값
    addCartItem (state, action) {
        const { cartItem } = action.payload;
        state.cartList = cartItemsCheck(state.cartList, cartItem); 
    },
    showCartItem (state, action) {
        const { items } = action.payload;
        state.cartList = items;
//        state.cartList = cartItemsAddInfo(items, state.cartList);
    },
    updateCartCount (state, action) {
//        state.cartCount = state.cartList.reduce((total, item) => total + item.qty, 0);
//        const { count, type } = action.payload;
//        type ? state.cartCount += action.payload.count
//                  : state.cartCount = count;
        state.cartCount = action.payload.count;
    },
    resetCartCount (state) {
        state.cartCount = 0;
    },
    updateTotalPrice (state, action) {
        state.totalPrice = action.payload.totalPrice;
    },
    updateCartItem (state, action) {
        const { cid, type } = action.payload;

        // 카트 수량 변경
        state.cartList = state.cartList.map((item)=> 
              item.cid === cid ? ( type === "+" ? {...item, qty:item.qty+1 } : (item.qty > 1 ? {...item, qty:item.qty-1 } : item)) : item);
    },
    removeCartItem (state, action) {
        const { cid } = action.payload;
        state.cartList = state.cartList.filter(item => !(item.cid === cid));  // [{}]
    },
  },
})

export const { addCartItem, updateCartCount, showCartItem, updateTotalPrice, updateCartItem, removeCartItem, resetCartCount }
            = cartSlice.actions   //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default cartSlice.reducer  //store  import