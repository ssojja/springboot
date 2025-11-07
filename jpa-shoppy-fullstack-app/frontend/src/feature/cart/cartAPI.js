import React from 'react';
import { addCartItem, updateCartCount, showCartItem, updateTotalPrice, updateCartItem, removeCartItem } from './cartSlice.js';
import { axiosData, axiosPost } from '../../utils/dataFetch.js';

export const removeCart = (cid) => async (dispatch) => {
    const url = "/cart/deleteItem";
    const data = { "cid" : cid };
    const rows = await axiosPost(url, data);
    const { userId } = JSON.parse(localStorage.getItem("logInInfo"));
    dispatch(getCartCount(userId));
    dispatch(showCart());
//    dispatch(removeCartItem({"cid":cid}));
//    dispatch(updateTotalPrice());
//    dispatch(updateCartCount());
}

export const showCart = () => async (dispatch) => {
//    const jsonData = await axiosData("/data/products.json");
    const url = "/cart/list";
    const { userId } = JSON.parse(localStorage.getItem("logInInfo"));
    const jsonData = await axiosPost(url, { "id": userId });
    dispatch(showCartItem({"items": jsonData}));
    jsonData.length && dispatch(updateTotalPrice({"totalPrice" : jsonData[0].totalPrice}));
}

export const updateCart = (cid, type) => async (dispatch) => {
    alert("확인!!!!!!!!!!!");
    const url = "/cart/updateQty";
    const data = { "cid": cid, "type": type };
    const rows = await axiosPost(url, data);
    console.log("updateCart rows => ", rows);
    const { userId } = JSON.parse(localStorage.getItem("logInInfo"));
    dispatch(getCartCount(userId));
    dispatch(showCart());
    //return rows;
//    dispatch(updateCartItem({"cid":cid, "type":type})); // cartList 수량 변경
//    dispatch(updateTotalPrice());
//    dispatch(updateCartCount());
}

export const checkQty = async (pid, size, id) => {
    // 쇼핑백 추가한 상품과 사이즈가 DB 테이블에 있는지 유무 확인
    const url = "/cart/checkQty";
    const data = { "pid": pid, "size": size, "id": id};
    const jsonData =  await axiosPost(url, data);
    return jsonData;
}

export const addCart = (pid, size) => async (dispatch) => {
    const { userId } = JSON.parse(localStorage.getItem("logInInfo"));
    const checkResult = await checkQty(pid, size, userId);

    if(!checkResult.checkQty){
        const url = "/cart/add";
        const item = {"pid":pid, "size":size, "qty":1, "id": userId};
        const rows = await axiosPost(url, item);
        alert("새로운 상품이 추가되었습니다.");
    } else {
        // qty update
//        const rows = await updateCart(checkResult.cid, "+");
        const rows = dispatch(updateCart(checkResult.cid, "+"));
        alert("상품이 추가되었습니다.");
    }

    dispatch(getCartCount(userId));
    return 1;
//    dispatch(addCartItem({"cartItem":{"pid":pid, "size":size, "qty":1}}));
//    dispatch(updateCartCount());
}

/* 회원 아이디별 장바구니 카운트 */
export const getCartCount = (id) => async (dispatch) => {
    const url = "/cart/count";
    const data = { "id": id };
    const jsonData = await axiosPost(url, data);
    dispatch(updateCartCount({"count":jsonData.sumQty}));
//    return jsonData.sumQty;
}