package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
import com.springboot.shoppy_fullstack_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/pid")
    public Product pid(@RequestBody Product product){
        return productService.findByPid(product.getPid());
    }

    @GetMapping("/all")
    public List<Product> all(){
        System.out.println("Controller ===>");
        return productService.findAll();
    }

    @PostMapping("/detailInfo")
    public ProductDetailInfo detailInfo(@RequestBody Product product){
        System.out.println("pid ==> " + product.getPid());
        return productService.findDetailInfo(product.getPid());
    }

    @PostMapping("/qna")
    public List<ProductQna> qna(@RequestBody Product product){
        System.out.println("pid ==> " + product.getPid());
        return productService.findQna(product.getPid());
    }

}
