package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;

import java.util.List;

public interface ProductService {
    Product findByPid(int pid);
    List<Product> findAll();
    ProductDetailInfo findDetailInfo(int pid);
    List<ProductQna> findQna(int pid);
    ProductReturn findReturn();
}
