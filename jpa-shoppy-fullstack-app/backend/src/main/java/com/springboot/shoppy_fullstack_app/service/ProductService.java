package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.ProductDto;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfoDto;
import com.springboot.shoppy_fullstack_app.dto.ProductQnaDto;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDto;

import java.util.List;

public interface ProductService {
    ProductDto findByPid(int pid);
    List<ProductDto> findAll();
    ProductDetailinfoDto findDetailinfo(int pid);
    List<ProductQnaDto> findQna(int pid);
    ProductReturnDto findReturn();
}
