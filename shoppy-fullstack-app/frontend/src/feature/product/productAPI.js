import React from 'react';
import { createProduct, filterProduct } from './productSlice.js';
import { axiosData, groupByRows } from '../../utils/dataFetch.js';

export const getProductList = (number) => async (dispatch) => {
    const jsonData = await axiosData("/data/products.json");
    const rows = groupByRows(jsonData, number);
    dispatch(createProduct({"products":jsonData, "productList":rows}));
}

export const getProduct = (pid) => async (dispatch) => {
    // dispatch(filterProduct(pid));    // 둘 다 가능
    dispatch(filterProduct({"pid": pid}));
}