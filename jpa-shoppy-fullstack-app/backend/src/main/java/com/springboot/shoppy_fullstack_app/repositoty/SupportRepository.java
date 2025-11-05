package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Support;

import java.util.List;

public interface SupportRepository {
    List<Support> findAll();
    List<Support> findAll(Support support);
}
