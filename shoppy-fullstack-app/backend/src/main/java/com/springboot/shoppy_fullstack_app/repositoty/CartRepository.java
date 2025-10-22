package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.CartItem;

public interface CartRepository {
    int add(CartItem cartItem);
    CartItem checkQty(CartItem cartItem);
    int updateQty(CartItem cartItem);
}
