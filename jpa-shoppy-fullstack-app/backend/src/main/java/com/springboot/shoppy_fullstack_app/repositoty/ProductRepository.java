package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.ProductDto;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfoDto;
import com.springboot.shoppy_fullstack_app.dto.ProductQnaDto;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDto;

import java.util.List;

public interface ProductRepository {
    List<ProductDto> findAll();
    ProductDto findByPid(int pid);
    ProductDetailinfoDto findProductDetailinfo(int pid);
    List<ProductQnaDto> findQna(int pid);
    ProductReturnDto findReturn();
}
