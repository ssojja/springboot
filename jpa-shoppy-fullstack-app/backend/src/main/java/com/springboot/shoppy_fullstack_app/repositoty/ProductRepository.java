package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    Product findByPid(int pid);
    ProductDetailInfo findProductDetailinfo(int pid);
    List<ProductQna> findQna(int pid);
    ProductReturn findReturn();
}
