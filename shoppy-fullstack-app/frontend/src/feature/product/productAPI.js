import React from 'react';
import { createProduct, filterProduct } from './productSlice.js';
import { axiosGet ,axiosData, axiosPost, groupByRows } from '../../utils/dataFetch.js';

export const getProductList = (number) => async (dispatch) => {
//    const jsonData = await axiosData("/data/products.json");
    const url = "/product/all";
    const jsonData = await axiosGet(url);

    console.log("jsonData ==>" ,jsonData);

    const rows = groupByRows(jsonData, number);
    dispatch(createProduct({"products":jsonData, "productList":rows}));
}

export const getProduct = (pid) => async (dispatch) => {
    // dispatch(filterProduct(pid));    // 둘 다 가능
    const url = "/product/pid";
    const product = await axiosPost(url, {"pid":pid});
    console.log("product ==>", product);
    dispatch(filterProduct({"product": product}));
}