package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Product;
import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    Product findByPid(int pid);
}
